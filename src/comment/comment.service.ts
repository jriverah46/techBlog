import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostEntity } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(authorId: number, createCommentDto: CreateCommentDto) {
    const [author, post] = await Promise.all([
      this.userRepository.findOne({ where: { id: authorId } }),
      this.postRepository.findOne({ where: { id: createCommentDto.postId } }),
    ]);

    if (!author) {
      throw new NotFoundException('El autor no existe');
    }

    if (!post) {
      throw new NotFoundException('El post no existe');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      author,
      post,
    });

    return this.commentRepository.save(comment);
  }

  findByPost(postId: string) {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }

    if (comment.author.id !== userId) {
      throw new ForbiddenException('No puedes actualizar este comentario');
    }

    const { postId, ...commentData } = updateCommentDto;
    Object.assign(comment, commentData);
    return this.commentRepository.save(comment);
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }

    if (comment.author.id !== userId) {
      throw new ForbiddenException('No puedes eliminar este comentario');
    }

    await this.commentRepository.remove(comment);
    return { deleted: true };
  }
}

