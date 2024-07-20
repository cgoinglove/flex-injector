import { suite, expect, test, beforeAll } from 'vitest';
import { TodoService } from '../src/domain/todo/todo.service';
import { type Todo } from '../src/domain/todo/todo.entity';
import { inject } from '../src';
import { AppDataSource } from '../src/orm-config';

const todoService = inject(TodoService);

beforeAll(async () => {
  /**
   * If you have correctly configured the database connection information in 'packages/typeorm-service/src/orm-config.ts',
   * remove this skipIf statement and run the tests.
   */
  await AppDataSource.initialize();
});

suite('Todo', () => {
  let id: Todo['id'];

  test('Insert', async () => {
    console.log(`insert`);
    const newTodo = await todoService.add('Hello World');

    id = newTodo.id;

    expect(newTodo.complete).toBeFalsy();
  });

  test('Select', async () => {
    const todo = await todoService.findById(id);
    expect(todo?.content).toBe('Hello World');
  });

  test('Update', async () => {
    await todoService.complete(id);

    const todo = await todoService.findById(id);

    expect(todo?.complete).toBeTruthy();
  });
  test('Delete', async () => {
    await todoService.deleteById(id);

    const todo = await todoService.findById(id);

    expect(todo).toBeNull();
  });

  test.skip('Delete All', async () => {
    const list = await todoService.findAll();
    await Promise.all(list.map(todo => todoService.deleteById(todo.id)));

    const newList = await todoService.findAll();

    expect(newList.length).toBeFalsy();
  });
});
