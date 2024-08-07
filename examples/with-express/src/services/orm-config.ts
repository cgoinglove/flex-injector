import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './todo/todo.entity';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqljs',
  synchronize: true,
  // logging: process.env.NODE_ENV != 'test',
  autoSave: false,
  dropSchema: true,
  entities: [Todo, User],
});
