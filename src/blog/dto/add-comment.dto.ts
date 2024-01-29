import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';


export class AddCommentDto {
  @ApiProperty({
    description:"Content of the comment",
    required: true
  })
  @IsString()
  content: string;
}
