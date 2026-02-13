import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { MessageResponseDto } from '../common/dto/message-response.dto';
import { BookmarkService } from './bookmark.service';
import { BookmarkResponseDto } from './dto/bookmark-response.dto';
import { BookmarkStatusResponseDto } from './dto/bookmark-status-response.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarksQueryDto } from './dto/get-bookmarks-query.dto';

@ApiTags('Bookmark')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  /**
   * 북마크 추가
   * @param createBookmarkDto 북마크 추가 DTO
   */
  @Post()
  async addBookmark(
    @Req() req: RequestWithUser,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    return this.bookmarkService.addBookmark(req.user.id, createBookmarkDto.contentId);
  }

  /**
   * 북마크 제거
   * @param contentId 컨텐츠 ID
   */
  @Delete(':contentId')
  async removeBookmark(
    @Req() req: RequestWithUser,
    @Param('contentId', ParseIntPipe) contentId: number,
  ): Promise<MessageResponseDto> {
    return this.bookmarkService.removeBookmark(req.user.id, contentId);
  }

  /**
   * 내 북마크 목록 조회
   * @param query 페이징 쿼리
   */
  @Get()
  async getBookmarks(
    @Req() req: RequestWithUser,
    @Query() query: GetBookmarksQueryDto,
  ): Promise<BookmarkResponseDto[]> {
    return this.bookmarkService.getBookmarks(req.user.id, query.limit, query.offset);
  }

  /**
   * 북마크 상태 확인
   * @param contentId 컨텐츠 ID
   */
  @Get(':contentId/status')
  async checkBookmarkStatus(
    @Req() req: RequestWithUser,
    @Param('contentId', ParseIntPipe) contentId: number,
  ): Promise<BookmarkStatusResponseDto> {
    return this.bookmarkService.isBookmarked(req.user.id, contentId);
  }
}
