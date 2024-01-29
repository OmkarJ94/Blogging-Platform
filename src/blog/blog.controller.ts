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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('blog')
@ApiTags('Blogs Api')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly jwtService: JwtService,
  ) {}

  //Api for add the blog
  @Post('/addblog')
  @ApiOperation({ summary: 'This api is for add the blog' })
  @ApiResponse({
    status: 201,
    description: 'Blog added successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  AddBlog(@Body() blog: CreateBlogDto, @Req() req: Request) {
    return this.blogService.addBlog(blog, req);
  }

  //Api for the like the blog
  @Post('/like/:blogId')
  @ApiOperation({ summary: 'This api is for like the blog' })
  @ApiParam({
    name: 'blogId',
    type: "string",
    description: 'This is id of blog which user want to like',
    required:true
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Blog added successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  likeBlog(@Param('blogId') id: string, @Req() req: Request) {
    return this.blogService.likeBlog(id, req);
  }


  //Api for the get all blogs of particular user
  @Get('/getallblogs/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for get all blog' })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'This is id of user  whose blogs are required',
    required:true
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Blog liked successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @UseGuards(AuthGuard)
  getAllBlogs(@Param('userId', ParseIntPipe) id: number) {
    return this.blogService.getAllBlog(id);
  }


//Api for addcomment on a blog
  @Post('/addcomment/:blogId')
  @ApiOperation({ summary: 'This api is for adding comment to the blog' })
  @ApiParam({
    name: 'blogId',
    type: 'string',
    description: 'This is id of blog to which user want to add a comment',
    required:true
  })
  @ApiResponse({
    status: 201,
    description: 'comment added successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  addComment(
    @Param('blogId') id: Types.ObjectId,
    @Body() addCommentDto: AddCommentDto,
    @Req() req: Request,
  ) {
    return this.blogService.addComment(id, addCommentDto, req);
  }

  //Api for like the comment
  @Post('/likecomment')
  @ApiOperation({ summary: 'This api is for like a comment of the blog' })
  @ApiQuery(
    {
    name: 'commentId',
    type: 'string',
    description: 'This is id of comment which is comment on blog with Blog Id',
    required:true
    }
  )
  @ApiQuery(
    {
    name: 'blogId',
    type: 'string',
    description: 'This is id of blog to which user want to add a comment',
    required:true
    }
  )
 
  @ApiResponse({
    status: 201,
    description: 'like the blog successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  likeComment(
    @Query('blogId') blogId: Types.ObjectId,
    @Query('commentId') commentId: Types.ObjectId,
    @Req() req: Request,
  ) {
    return this.blogService.likeComment(blogId, commentId, req);
  }

//Api for the get all comments of particular blog
  @Get('/getallcomments/:blogId')
  @ApiOperation({ summary: 'This api is for get all comments' })
  @ApiParam({
    name: 'blogId',
    type: 'string',
    description: 'This is id of blgs whose comment are required',
    required:true
  })
  @ApiResponse({
    status: 200,
    description: 'Return all comments',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getAllComment(@Param('blogId') id: Types.ObjectId) {
    return this.blogService.getAllComments(id);
  }

  //Api for getting like count of blog
  @Get('/getlikecount/:blogId')
  @ApiOperation({ summary: 'This api is for get like count of particular blog' })
  @ApiParam({
    name: 'blogId',
    type: 'string',
    description: 'This is id of blog whose like coun is required',
    required:true
  })
  @ApiResponse({
    status: 200,
    description: 'Return the like count',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getlikecount(@Param('blogId') id: Types.ObjectId) {
    return this.blogService.getCountOfBlogLikes(id);
  }

  //Api for the getting like count on comment on blog
  @Get('/getcommentlikecount')
  @ApiOperation({ summary: 'This api is for get like count of comment on blog' })
  @ApiQuery(
    {
    name: 'commentId',
    type: 'string',
    description: 'This is id of comment which is comment on blog with Blog Id',
    required:true
    }
  )
  @ApiQuery(
    {
    name: 'blogId',
    type: 'string',
    description: 'This is id of blog to which user want to add a comment',
    required:true
    }
  )
  @ApiResponse({
    status: 200,
    description: 'Blog liked successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized(check all fields and route)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getcommentlikecount(
    @Query('blogId') blogId: Types.ObjectId,
    @Query('commentId') commentId: Types.ObjectId,
  ) {
    return this.blogService.getCountOfCommentLikes(blogId, commentId);
  }
}
