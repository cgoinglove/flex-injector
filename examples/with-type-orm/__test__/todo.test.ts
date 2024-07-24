import { describe, it, expect, beforeAll } from 'vitest';
import { UserService } from '../src/domain/user/user.service';
import { AppDataSource } from '../src/orm-config';
import { inject } from '../src/injector';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    await AppDataSource.initialize();

    userService = inject(UserService);
  });

  it('should create a new user', async () => {
    const user = await userService.createUser({ name: 'John Doe' });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
  });

  it('should get all users', async () => {
    const users = await userService.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should create a new todo for a user', async () => {
    const user = await userService.createUser({ name: 'Jane Doe' });
    const todo = await userService.createTodoForUser(user.id, {
      content: 'Finish homework',
      complete: false,
    });
    expect(todo).toHaveProperty('id');
    expect(todo.content).toBe('Finish homework');
    expect(todo.user.id).toBe(user.id);
  });

  it('should get all todos for a user', async () => {
    const user = await userService.createUser({ name: 'Mark Smith' });
    await userService.createTodoForUser(user.id, {
      content: 'Read a book',
      complete: false,
    });
    const todos = await userService.getUserTodos(user.id);
    expect(todos.length).toBeGreaterThan(0);
  });

  it('should delete a user and their todos', async () => {
    const user = await userService.createUser({ name: 'Anna Bell' });
    await userService.createTodoForUser(user.id, {
      content: 'Go shopping',
      complete: false,
    });
    await userService.deleteUser(user.id);
    const foundUser = await userService.getUserById(user.id);
    const todos = await userService.getUserTodos(user.id);
    expect(foundUser).toBeNull();
    expect(todos.length).toBe(0);
  });
});
