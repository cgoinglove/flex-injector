import { InjectAble } from '../injector';
import { AppDataSource } from '../orm-config';
import { Todo } from './todo.entity';

@InjectAble
export class TodoRepository {
  private todoRepo = AppDataSource.getRepository(Todo);

  async findById(id: Todo['id']) {
    return this.todoRepo.findOneBy({ id });
  }

  async findAll() {
    return this.todoRepo.find();
  }
  async findByUserId(userId: number) {
    return this.todoRepo.find({ where: { user: { id: userId } } });
  }

  async create(todo: Partial<Todo>) {
    const newTodo = this.todoRepo.create(todo);
    return this.todoRepo.save(newTodo);
  }

  async update(id: Todo['id'], updateTodo: Partial<Todo>) {
    return this.todoRepo.update(id, updateTodo);
  }

  async delete(id: Todo['id']) {
    return this.todoRepo.delete(id);
  }
}
