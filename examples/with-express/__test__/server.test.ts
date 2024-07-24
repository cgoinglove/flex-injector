import request from 'supertest';
import express, { Express } from 'express';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { router } from '../src/app/router';
import { AppDataSource } from '../src/services/orm-config';

const app: Express = express();
app.use(express.json());
app.use('/api', router);

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({ name: 'John Doe' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new todo for a user', async () => {
    const userRes = await request(app).post('/api/users').send({ name: 'Jane Doe' });
    const userId = userRes.body.id;

    const todoRes = await request(app)
      .post(`/api/users/${userId}/todos`)
      .send({ content: 'Finish homework', complete: false });
    expect(todoRes.status).toBe(201);
    expect(todoRes.body).toHaveProperty('id');
    expect(todoRes.body.content).toBe('Finish homework');
    expect(todoRes.body.user.id).toBe(userId);
  });

  it('should get all todos for a user', async () => {
    const userRes = await request(app).post('/api/users').send({ name: 'Mark Smith' });
    const userId = userRes.body.id;

    await request(app).post(`/api/users/${userId}/todos`).send({ content: 'Read a book', complete: false });

    const todosRes = await request(app).get(`/api/users/${userId}/todos`);
    expect(todosRes.status).toBe(200);
    expect(todosRes.body.length).toBeGreaterThan(0);
  });

  it('should delete a user and their todos', async () => {
    const userRes = await request(app).post('/api/users').send({ name: 'Anna Bell' });
    const userId = userRes.body.id;

    await request(app).post(`/api/users/${userId}/todos`).send({ content: 'Go shopping', complete: false });

    await request(app).delete(`/api/users/${userId}`);
    const foundUserRes = await request(app).get(`/api/users/${userId}`);
    const todosRes = await request(app).get(`/api/users/${userId}/todos`);

    expect(foundUserRes.status).toBe(404);
    expect(todosRes.body.length).toBe(0);
  });
});
