import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { PG_FOREIGN_KEY_VIOLATION, PG_UNIQUE_VIOLATION } from '../common/constants/postgres-errors';
import { Database } from '../database.types';
import { SupabaseService } from '../supabase/supabase.service';
import { BookmarkResponseDto } from './dto/bookmark-response.dto';

type BookmarkRow = Database['public']['Tables']['bookmark']['Row'];
type LandmarkRow = Pick<
  Database['public']['Tables']['landmark_combined']['Row'],
  'contentid' | 'title' | 'firstimage' | 'addr1' | 'cat1' | 'cat2' | 'cat3'
>;
type BookmarkLandmark = BookmarkResponseDto['landmark'];

@Injectable()
export class BookmarkService {
  private readonly logger = new Logger(BookmarkService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  private async fetchLandmarkMap(contentIds: number[]): Promise<Map<number, LandmarkRow>> {
    if (contentIds.length === 0) {
      return new Map<number, LandmarkRow>();
    }

    const { data, error } = await this.client
      .from('landmark_combined')
      .select('contentid,title,firstimage,addr1,cat1,cat2,cat3')
      .in('contentid', contentIds);

    if (error) {
      this.logger.error(`Failed to fetch landmarks: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch bookmarks');
    }

    const map = new Map<number, LandmarkRow>();
    for (const landmark of (data || []) as LandmarkRow[]) {
      map.set(landmark.contentid, landmark);
    }

    return map;
  }

  private async enrichBookmarks(bookmarks: BookmarkRow[]): Promise<BookmarkResponseDto[]> {
    const contentIds = [...new Set(bookmarks.map((bookmark) => bookmark.contentid))];
    const landmarkMap = await this.fetchLandmarkMap(contentIds);

    return bookmarks.map((bookmark): BookmarkResponseDto => {
      const landmark = landmarkMap.get(bookmark.contentid);
      const mappedLandmark: BookmarkLandmark = landmark
        ? {
            contentId: landmark.contentid,
            title: landmark.title,
            firstImage: landmark.firstimage,
            addr1: landmark.addr1,
            cat1: landmark.cat1,
            cat2: landmark.cat2,
            cat3: landmark.cat3,
          }
        : null;

      return {
        id: bookmark.id,
        userId: bookmark.userid,
        contentId: bookmark.contentid,
        createdAt: bookmark.created_at,
        landmark: mappedLandmark,
      };
    });
  }

  async addBookmark(userId: string, contentId: number): Promise<BookmarkResponseDto> {
    const { data, error } = await this.client
      .from('bookmark')
      .insert({
        userid: userId,
        contentid: contentId,
      })
      .select('id,userid,contentid,created_at')
      .single();

    if (error) {
      if (error.code === PG_FOREIGN_KEY_VIOLATION) {
        if (error.message.includes('contentid') || error.message.includes('landmark')) {
          throw new NotFoundException('Landmark content does not exist');
        }
        this.logger.error(`Foreign key violation: ${error.message}`);
        throw new InternalServerErrorException(
          'Data inconsistency detected while adding bookmark.',
        );
      }
      if (error.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictException('Bookmark already exists');
      }
      this.logger.error(`Unexpected error while adding bookmark: ${error.message}`);
      throw new InternalServerErrorException('Failed to add bookmark');
    }

    const [bookmark] = await this.enrichBookmarks([data as BookmarkRow]);
    return bookmark;
  }

  async removeBookmark(userId: string, contentId: number): Promise<{ message: string }> {
    const { error, count } = await this.client
      .from('bookmark')
      .delete({ count: 'exact' })
      .eq('userid', userId)
      .eq('contentid', contentId);

    if (error) {
      this.logger.error(`Error removing bookmark: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove bookmark');
    }

    if (count === 0) {
      throw new NotFoundException('Bookmark not found');
    }

    return { message: 'Bookmark removed successfully' };
  }

  async getBookmarks(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<BookmarkResponseDto[]> {
    const { data, error } = await this.client
      .from('bookmark')
      .select('id,userid,contentid,created_at')
      .eq('userid', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      this.logger.error(`Failed to fetch bookmarks: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch bookmarks');
    }

    return this.enrichBookmarks((data || []) as BookmarkRow[]);
  }

  async isBookmarked(userId: string, contentId: number): Promise<{ isBookmarked: boolean }> {
    const { count, error } = await this.client
      .from('bookmark')
      .select('*', { count: 'exact', head: true })
      .eq('userid', userId)
      .eq('contentid', contentId);

    if (error) {
      this.logger.error(`Failed to check bookmark status: ${error.message}`);
      throw new InternalServerErrorException('Failed to check status');
    }

    return { isBookmarked: (count || 0) > 0 };
  }
}
