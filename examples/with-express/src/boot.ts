import { AppDataSource } from './services/orm-config';

console.info(`App Boot`);
AppDataSource.initialize().then(() => {
  console.info(`✅ Success initialized Database`);
  require('./app');
});
