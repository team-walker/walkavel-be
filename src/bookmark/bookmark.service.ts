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

  async addBookmark(userId: string, contentId: number) {
    const { data, error } = await this.client
      .from('bookmark')
      .upsert(
        {
          user_id: userId,
          content_id: contentId,
        },
        { onConflict: 'user_id,content_id', ignoreDuplicates: false },
      )
      .select()
      .single();

    if (error) {
      if (error.code === '23503') {
        if (error.message.includes('bookmarks_landmark_fk')) {
          throw new NotFoundException('Landmark content does not exist');
        }
        // Log other FK violations for debugging, but return a generic error to the user.
        this.logger.error(`Unhandled foreign key violation: ${error.message}`);
        throw new InternalServerErrorException('Failed to add bookmark due to data inconsistency.');
      }
      if (error.code === '23505') {
        throw new ConflictException('Bookmark already exists');
      }
      this.logger.error(`Failed to add bookmark: ${error.message}`);
      throw new InternalServerErrorException('Failed to add bookmark');
    }
    return data;
  }

  async removeBookmark(userId: string, contentId: number) {
    const { error, count } = await this.client
      .from('bookmark')
      .delete({ count: 'exact' })
      .eq('user_id', userId)
      .eq('content_id', contentId);

    if (error) {
      this.logger.error(`Failed to remove bookmark: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove bookmark');
    }

    if (count === 0) {
      throw new NotFoundException('Bookmark not found');
    }

    return { message: 'Bookmark removed successfully' };
  }

  async getBookmarks(userId: string, limit = 20, offset = 0): Promise<BookmarkWithLandmark[]> {
    const { data, error } = await this.client
      .from('bookmark')
      .select(
        `
        id,
        content_id,
        created_at,
        landmark (
          contentid,
          title,
          firstimage,
          addr1,
          cat1,
          cat2,
          cat3
        )
      `,
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      this.logger.error(`Failed to fetch bookmarks: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch bookmarks');
    }

    // In Supabase with TS, joined objects are inferred. We cast for convenience.
    return (data || []) as unknown as BookmarkWithLandmark[];
  }

  async isBookmarked(userId: string, contentId: number): Promise<{ isBookmarked: boolean }> {
    const { count, error } = await this.client
      .from('bookmark')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('content_id', contentId);

    if (error) {
      this.logger.error(`Failed to check bookmark status: ${error.message}`);
      throw new InternalServerErrorException('Failed to check status');
    }

    return { isBookmarked: (count || 0) > 0 };
  }
}
