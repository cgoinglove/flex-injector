import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({
  name: 'todo',
})
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    comment: '내용',
    length: 100,
  })
  content: string;

  @Column()
  complete: boolean;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => User, user => user.todos, {
    onDelete: 'CASCADE',
  })
  user: User;

  @UpdateDateColumn()
  updatedAt: string;
}
