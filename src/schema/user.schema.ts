import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;
}

export type userDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
