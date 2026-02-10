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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { BookmarkService } from './bookmark.service';
import { BookmarkResponseDto } from './dto/bookmark-response.dto';
import { BookmarkStatusResponseDto } from './dto/bookmark-status-response.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarksQueryDto } from './dto/get-bookmarks-query.dto';
import { BookmarkWithLandmark } from './interfaces/bookmark.interface';

@ApiTags('Bookmark')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  @ApiOperation({ summary: 'Add a bookmark' })
  @ApiResponse({ type: BookmarkResponseDto, status: 201 })
  async addBookmark(
    @Req() req: RequestWithUser,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkWithLandmark> {
    return this.bookmarkService.addBookmark(req.user.id, createBookmarkDto.contentId);
  }

  @Delete(':contentId')
  @ApiOperation({ summary: 'Remove a bookmark by content ID' })
  async removeBookmark(
    @Req() req: RequestWithUser,
    @Param('contentId', ParseIntPipe) contentId: number,
  ): Promise<{ message: string }> {
    return this.bookmarkService.removeBookmark(req.user.id, contentId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookmarks for the current user' })
  @ApiResponse({ type: BookmarkResponseDto, isArray: true })
  async getBookmarks(
    @Req() req: RequestWithUser,
    @Query() query: GetBookmarksQueryDto,
  ): Promise<BookmarkWithLandmark[]> {
    return this.bookmarkService.getBookmarks(req.user.id, query.limit, query.offset);
  }

  @Get(':contentId/status')
  @ApiOperation({ summary: 'Check if a specific content is bookmarked' })
  @ApiResponse({ type: BookmarkStatusResponseDto })
  async checkBookmarkStatus(
    @Req() req: RequestWithUser,
    @Param('contentId', ParseIntPipe) contentId: number,
  ): Promise<BookmarkStatusResponseDto> {
    return this.bookmarkService.isBookmarked(req.user.id, contentId);
  }
}
