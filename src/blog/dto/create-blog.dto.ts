import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description:"Title of the blog",
    required:true
  })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({
    description:"Content of the blog",
    required:true
  })
  @IsString()
  @MaxLength(140)
  content: string;
}
