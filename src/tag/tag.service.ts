import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const exists = await this.tagRepository.findOne({ where: { name: createTagDto.name } });
    if (exists) {
      throw new BadRequestException('La etiqueta ya existe');
    }
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Etiqueta no encontrada');
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    if (updateTagDto.name && updateTagDto.name !== tag.name) {
      const exists = await this.tagRepository.findOne({ where: { name: updateTagDto.name } });
      if (exists) {
        throw new BadRequestException('La etiqueta ya existe');
      }
    }
    Object.assign(tag, updateTagDto);
    return this.tagRepository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    await this.tagRepository.remove(tag);
    return { deleted: true };
  }
}
