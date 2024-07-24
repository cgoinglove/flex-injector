import { InjectAble } from '../../injector';
import { UserRepository } from './user.repository';

import { User } from './user.entity';
import { TodoRepository } from '../todo/todo.repository';
import { Todo } from '../todo/todo.entity';

@InjectAble
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private todoRepo: TodoRepository
  ) {}

  async getUserById(id: User['id']) {
    return this.userRepo.findById(id);
  }

  async getAllUsers() {
    return this.userRepo.findAll();
  }

  async createUser(user: Partial<User>) {
    return this.userRepo.create(user);
  }

  async updateUser(id: User['id'], updateUser: Partial<User>) {
    return this.userRepo.update(id, updateUser);
  }

  async deleteUser(id: User['id']) {
    return this.userRepo.delete(id);
  }

  async getUserTodos(userId: User['id']) {
    return this.todoRepo.findByUserId(userId);
  }

  async createTodoForUser(userId: User['id'], todo: Partial<Todo>) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.todoRepo.create({ ...todo, user });
  }
}
