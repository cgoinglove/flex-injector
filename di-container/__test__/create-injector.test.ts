import { describe, it, expect } from 'vitest';
import { createInjector } from '../src';

describe('createInjector Tests', () => {
  const { inject, InjectAble } = createInjector();

  @InjectAble
  class TodoService {
    getTodo() {
      return 'Coding';
    }
  }

  @InjectAble
  class UserService {
    constructor(private todoService: TodoService) {}

    getUser() {
      return { id: 1, name: 'John Doe' };
    }

    getTodo() {
      return this.todoService.getTodo();
    }
  }

  it('should return user information', () => {
    const userService = inject(UserService);
    expect(userService.getUser()).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should return todo from TodoService', () => {
    const userService = inject(UserService);
    const todoService = inject(TodoService);
    expect(userService.getTodo()).toBe(todoService.getTodo());
  });
});
