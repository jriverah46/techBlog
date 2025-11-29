import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(2)
  content: string;

  @IsUUID()
  postId: string;
}

