import {
  Inject,
  Injectable,
  Body,
  UnauthorizedException,
  Req,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, blogDocument } from 'src/schema/blogs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Request } from 'express';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<blogDocument>) {}

  //Add a blog 
  async addBlog(createBlogDto: CreateBlogDto, req: Request) {

    const { title, content } = createBlogDto;
    try {
      const blog = await this.blogModel.create({
        title,
        content,
        user: req['id'],
      });
      return {
        message:"Blog added successfully"
      };
    } catch (error) {
      
      throw new UnauthorizedException();
    }
  }

  //Get all blogs
  async getAllBlog(id: number) {
    try {
      const blogs = this.blogModel.find({ user: id });
      return blogs;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  //Like a blog
  async likeBlog(id: string, req: Request) {
   try {
    const blog = await this.blogModel.findById(new Types.ObjectId(id));

    if (blog.like.find((id) => +id === req['id'])) {
    return{
      message:"You already like a blog"
    }
    }
    blog.like.push(req['id']);
    await blog.save();
    return{
      message:`You like a blog with id ${id} successfully`
    }
   } catch (error) {
    throw new UnauthorizedException()
   }
  }

  //Add a comment
  async addComment(
    id: Types.ObjectId,
    addCommentDto: AddCommentDto,
    req: Request,
  ) {
    try {
      const { content } = addCommentDto;
      const blog = await this.blogModel.findById(id);

      if (!blog) {
       return {
        message:`Blog with with id ${id} is not present`
       }
      }

      blog.comments.push({
        id: new Types.ObjectId(),
        content,
        user: req['id'],
      });

      blog.save();

      return {
        message:"Comment added successfully"
      };
    } catch (error) {
      
      throw new UnauthorizedException('something went wrong');
    }
  }

  //like a comment

  async likeComment(
    blogId: Types.ObjectId,
    commentId: Types.ObjectId,
    req: Request,
  ) {
    try {
      const blog = await this.blogModel.findById(blogId);
      if (!blog) {
        return {
         message:`Blog with with id ${blogId} is not present`
        }
       }

      const comment = blog.comments.find((comment) =>
        comment.id.equals(new Types.ObjectId(commentId)),
      );
      if (!comment) {
        return {
         message:`comment with with id ${commentId} is not present`
        }
       }

      blog.comment_liked.push({
        comment_id: commentId,
        user: req['id'],
      });

      await blog.save();

      return {
        message:"Comment like successfully"
      };
    } catch (error) {
      throw new UnauthorizedException('something went wrong');
    }
  }

  async getAllComments(id: Types.ObjectId) {
    try {
      const blog = await this.blogModel.findById(id);

      return blog.comments;
    } catch (error) {
      throw new UnauthorizedException('something went wrong');
    }
  }

  async getCountOfBlogLikes(id: Types.ObjectId) {
    try {
      const blog = await this.blogModel.findById(id);
      
      return { 'like count': blog.like.length };
    } catch (error) {
      
      throw new UnauthorizedException('something went wrong');
    }
  }

  async getCountOfCommentLikes(
    blogId: Types.ObjectId,
    commentId: Types.ObjectId,
  ) {
    try {
      const blog = await this.blogModel.findById(blogId);
      let size = 0;
      for (let comment of blog.comment_liked) {
        
        if (comment.comment_id === commentId) {
          size++;
        }
      }

      return {
        'Comment like count': size,
      };
    } catch (error) {
      throw new UnauthorizedException('something went wrong');
    }
  }
}