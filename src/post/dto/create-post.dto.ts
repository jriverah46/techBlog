import { IsArray, IsEnum, IsOptional, IsString, MaxLength, MinLength, IsInt } from 'class-validator';
import { PostStatus } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  @MaxLength(180)
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(280)
  excerpt?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
