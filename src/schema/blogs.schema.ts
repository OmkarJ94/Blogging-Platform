import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  collection: 'Blog',
  timestamps: true,
})
export class Blog {
  @Prop({ required: true, type: Number })
  user: number;

  @Prop({ required: true, minlength: 5 })
  title: string;

  @Prop({ required: true, maxlength: 140, minlength: 5 })
  content: string;

  @Prop({ default: [] })
  like: number[];

  @Prop({ default: [] })
  comments: [
    {
      id: Types.ObjectId;
      content: string;
      user: number;
    },
  ];

  @Prop({ default: [] })
  comment_liked: [
    {
      comment_id: Types.ObjectId;
      user: number;
    },
  ];
}

export type blogDocument = Blog & Document;
export const blogSchema = SchemaFactory.createForClass(Blog);
