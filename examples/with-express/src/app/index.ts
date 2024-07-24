import express, { Express } from 'express';
import { router } from './router';

const PORT = 5050;

const app: Express = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.info(`is running at http://localhost:${PORT}`));
