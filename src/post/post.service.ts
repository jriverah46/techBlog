import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity, PostStatus } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { TagEntity } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(authorId: number, createPostDto: CreatePostDto) {
    const author = await this.userRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException('Autor no encontrado');
    }

    const { tagIds, ...postData } = createPostDto;
    const tags = await this.loadTags(tagIds);
    const post = this.postRepository.create({
      ...postData,
      slug: this.createSlug(postData.slug ?? postData.title),
      author,
      tags,
      status: postData.status ?? PostStatus.DRAFT,
      publishedAt: postData.status === PostStatus.PUBLISHED ? new Date() : undefined,
    });
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({
      relations: ['author', 'tags'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'tags', 'comments', 'comments.author'],
    });
    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'tags'],
    });
    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('No puedes editar este post');
    }

    const { tagIds, ...postData } = updatePostDto;

    if (postData.slug) {
      postData.slug = this.createSlug(postData.slug);
      post.slug = postData.slug;
    }

    if (tagIds !== undefined) {
      post.tags = await this.loadTags(tagIds);
    }

    if (postData.status === PostStatus.PUBLISHED && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    Object.assign(post, {
      ...postData,
      status: postData.status ?? post.status,
    });

    return this.postRepository.save(post);
  }

  async remove(id: string, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }
    if (post.author.id !== userId) {
      throw new ForbiddenException('No puedes eliminar este post');
    }
    await this.postRepository.remove(post);
    return { deleted: true };
  }

  private createSlug(value: string) {
    return value
      .toString()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async loadTags(tagIds?: number[]) {
    if (!tagIds || tagIds.length === 0) {
      return [];
    }
    return this.tagRepository.find({
      where: { id: In(tagIds) },
    });
  }
}
