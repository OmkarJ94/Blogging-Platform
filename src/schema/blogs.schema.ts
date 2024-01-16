import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({
  collection: 'Blog',
  timestamps: true,
})
export class Blog {
  @Prop({ required: true, type: Types.ObjectId })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, maxlength: 140 })
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
