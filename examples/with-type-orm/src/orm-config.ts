import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './domain/todo/todo.entity';
import { User } from './domain/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqljs',
  synchronize: true,
  // logging: process.env.NODE_ENV != 'test',
  autoSave: false,
  dropSchema: true,
  entities: [Todo, User],
});
