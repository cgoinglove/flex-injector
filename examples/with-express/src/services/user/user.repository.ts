import { InjectAble } from '../injector';
import { AppDataSource } from '../orm-config';
import { User } from './user.entity';

@InjectAble
export class UserRepository {
  private userRepo = AppDataSource.getRepository(User);

  async findById(id: User['id']) {
    return this.userRepo.findOneBy({ id });
  }

  async findAll() {
    return this.userRepo.find();
  }

  async create(user: Partial<User>) {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async update(id: User['id'], updateUser: Partial<User>) {
    return this.userRepo.update(id, updateUser);
  }

  async delete(id: User['id']) {
    return this.userRepo.delete(id);
  }
}
