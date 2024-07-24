# Example with-express

This project is an example of using [flex-injector](https://github.com/cgoinglove/flex-injector) combined with [express](https://expressjs.com/)

You can find the complete example code in the repository.

## Project Structure

```bash
├── __test__
│   └── server.test.ts
├── nodemon.json
├── package.json
├── src
│   ├── app
│   │   ├── index.ts
│   │   └── router
│   │       └── index.ts
│   ├── boot.ts
│   └── services
│       ├── injector.ts
│       ├── orm-config.ts
│       ├── todo
│       │   ├── todo.entity.ts
│       │   └── todo.repository.ts
│       └── user
│           ├── user.entity.ts
│           ├── user.repository.ts
│           └── user.service.ts
├── tsconfig.json
└── vitest.config.ts
```

## Example Code

```typescript
// ./src/app/router/index.ts
import { Router, Request, Response } from 'express';
import { inject } from '../../services/injector';
import { UserService } from '../../services/user/user.service';

const userService = inject(UserService);

const router: Router = Router();

router.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// ... routes...

export { router };
```

```typescript
// ./src/app/index.ts
import express, { Express } from 'express';
import { router } from './router';

const PORT = 5050;

const app: Express = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.info(`is running at http://localhost:${PORT}`));
```

## Testing

Check the test code using supertest

```typescript
// test.ts

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

// ...
```
