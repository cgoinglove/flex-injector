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

router.post('/users/:userId/todos', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const todo = await userService.createTodoForUser(userId, req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.get('/users/:userId/todos', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const todos = await userService.getUserTodos(userId);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get todos' });
  }
});

router.delete('/users/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export { router };
