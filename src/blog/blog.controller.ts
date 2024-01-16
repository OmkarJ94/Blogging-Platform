import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/jwt.gaurd';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Types } from 'mongoose';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/addblog')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  AddBlog(@Body() blog: CreateBlogDto, @Req() req: Request) {
    
    return this.blogService.addBlog(blog, req);
  }

  @Post('/like/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  likeBlog(@Param('id') id: string, @Req() req: Request) {
    return this.blogService.likeBlog(id, req);
  }
  @Get('/getallblogs/:id')
  @UseGuards(AuthGuard)
  getAllBlogs(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getAllBlog(id);
  }

  @Post('/addcomment/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)

  addComment(
    @Param('id') id: Types.ObjectId,
    @Body() addCommentDto: AddCommentDto,
    @Req() req: Request,
  ) {
    return this.blogService.addComment(id, addCommentDto, req);
  }

  @Post('/likecomment')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  likeComment(
    @Query('blogId') blogId: Types.ObjectId,
    @Query('commentId') commentId: Types.ObjectId,
    @Req() req: Request,
  ) {
    return this.blogService.likeComment(blogId, commentId, req);
  }

  @Get('/getallcomments/:id')
  @UseGuards(AuthGuard)
  getAllComment(@Param('id') id: Types.ObjectId) {
    return this.blogService.getAllComments(id);
  }

  @Get('/getlikecount/:id')
  @UseGuards(AuthGuard)
  getlikecount(@Param('id') id: Types.ObjectId) {
    return this.blogService.getCountOfBlogLikes(id);
  }

  @Get('/getcommentlikecount')
  @UseGuards(AuthGuard)
  getcommentlikecount(
    @Query('blogId') blogId: Types.ObjectId,
    @Query('commentId') commentId: Types.ObjectId,
  ) {
    return this.blogService.getCountOfCommentLikes(blogId, commentId);
  }
}
