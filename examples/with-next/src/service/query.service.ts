import { InjectAble } from '@/injector';
import { Data, MockRepository } from './mock-database-repository';

@InjectAble
export class QueryService {
  constructor(private repository: MockRepository) {}

  findById(id: Data['id']) {
    return Promise.resolve(this.repository.select(id) as Data | undefined);
  }
  findAll() {
    return Promise.resolve(this.repository.select() as Data[]);
  }
  exits(id: Data['id']) {
    return Promise.resolve(Boolean(this.repository.select(id)));
  }
}
