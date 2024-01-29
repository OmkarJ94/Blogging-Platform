import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  async addBlog(createBlogDto: CreateBlogDto, req: Request): Promise<object> {
    const { title, content } = createBlogDto;
    try {
      const blog = await this.blogModel.create({
        title,
        content,
        user: req['id'],
      });
      return {
        message: 'Blog added successfully',
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  //Get all blogs
  async getAllBlog(id: number): Promise<object> {
    try {
      const blogs = this.blogModel.find({ user: id });
      return blogs;
    } catch (error) {
      
      throw new UnauthorizedException();
    }
  }

  //Like a blog
  async likeBlog(id: string, req: Request): Promise<object> {
    try {
      const blog = await this.blogModel.findById(new Types.ObjectId(id));

      if (blog.like.find((id) => +id === req['id'])) {
        return {
          message: 'You already like a blog',
        };
      }

      const updated = await this.blogModel.updateOne(
        { _id: id },
        { $set: { like: req['id'] } },
        { new: true },
      );

      return {
        message: `You like a blog with id ${id} successfully`,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  //Add a comment
  async addComment(
    id: Types.ObjectId,
    addCommentDto: AddCommentDto,
    req: Request,
  ): Promise<object> {
    try {
      const { content } = addCommentDto;

      const updated = await this.blogModel.findByIdAndUpdate(id, {
        $push: {
          comments: {
            id: new Types.ObjectId(),
            content,
            user: req['id'],
          },
        },
      });

      return {
        message: 'Comment added successfully',
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
  ): Promise<object> {
    try {
      const blog = await this.blogModel.findById(new Types.ObjectId(blogId));

      const isCommentLiked = blog.comment_liked.find(
        (comment) => comment.comment_id === commentId,
      );
      const isCommentPresent = blog.comments.find((comment) =>
        comment.id.equals(new Types.ObjectId(commentId)),
      );

      if (isCommentLiked) {
        return {
          message: 'You already like a comment',
        };
      } else if (!isCommentPresent) {
        return {
          message: `comment with id ${commentId} is not present`,
        };
      }

      const updated = await this.blogModel.findByIdAndUpdate(blogId, {
        $push: {
          comment_liked: {
            comment_id: commentId,
            user: req['id'],
          },
        },
      });

      if (!updated) {
        return {
          message: 'Something went wrong',
        };
      }

      return {
        message: 'Comment like successfully',
      };
    } catch (error) {
      
      throw new UnauthorizedException('something went wrong');
    }
  }

  //get all comments
  async getAllComments(id: Types.ObjectId): Promise<object> {
    try {
      const blog = await this.blogModel.findById(id);
      return blog.comments;
    } catch (error) {
      throw new UnauthorizedException('something went wrong');
    }
  }

  async getCountOfBlogLikes(id: Types.ObjectId): Promise<object> {
    try {
      const blog = await this.blogModel.findById(id);

      return { 'like count': blog.like.length };
    } catch (error) {
      throw new UnauthorizedException('something went wrong');
    }
  }
//get count of likes on comment
  async getCountOfCommentLikes(
    blogId: Types.ObjectId,
    commentId: Types.ObjectId,
  ): Promise<object> {
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
