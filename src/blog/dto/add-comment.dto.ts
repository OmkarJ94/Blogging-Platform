import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class AddCommentDto {
  @IsString()
  content: string;

 
}
