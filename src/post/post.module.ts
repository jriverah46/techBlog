import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostEntity } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { TagEntity } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User, TagEntity])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
