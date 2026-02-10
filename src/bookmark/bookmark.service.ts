import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { BookmarkWithLandmark } from './interfaces/bookmark.interface';

@Injectable()
export class BookmarkService {
  private readonly logger = new Logger(BookmarkService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async addBookmark(userId: string, contentId: number): Promise<BookmarkWithLandmark> {
    const { data, error } = await this.client
      .from('bookmark')
      .insert({
        userid: userId,
        contentid: contentId,
      })
      .select(
        `
        id,
        userId:userid,
        contentId:contentid,
        createdAt:created_at,
        landmark (
          contentId:contentid,
          title,
          firstImage:firstimage,
          addr1,
          cat1,
          cat2,
          cat3
        )
      `,
      )
      .single();

    if (error) {
      if (error.code === '23503') {
        if (error.message.includes('bookmark_landmark_fk')) {
          throw new NotFoundException('Landmark content does not exist');
        }
        this.logger.error(`Foreign key violation: ${error.message}`);
        throw new InternalServerErrorException(
          'Data inconsistency detected while adding bookmark.',
        );
      }
      if (error.code === '23505') {
        throw new ConflictException('Bookmark already exists');
      }
      this.logger.error(`Unexpected error while adding bookmark: ${error.message}`);
      throw new InternalServerErrorException('Failed to add bookmark');
    }
    return data;
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
  ): Promise<BookmarkWithLandmark[]> {
    const { data, error } = await this.client
      .from('bookmark')
      .select(
        `
        id,
        userId:userid,
        contentId:contentid,
        createdAt:created_at,
        landmark (
          contentId:contentid,
          title,
          firstImage:firstimage,
          addr1,
          cat1,
          cat2,
          cat3
        )
      `,
      )
      .eq('userid', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      this.logger.error(`Failed to fetch bookmarks: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch bookmarks');
    }

    return (data || []) as unknown as BookmarkWithLandmark[];
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
