import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PostEntity } from '../post/entities/post.entity';

@Entity({ name: 'tags' })
@Unique(['name'])
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];
}
