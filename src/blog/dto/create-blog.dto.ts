import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MaxLength(140)
  content: string;
}
