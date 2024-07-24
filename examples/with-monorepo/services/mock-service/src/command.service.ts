import { InjectAble } from './injector';
import { Data, MockRepository } from './mock-database-repository';

@InjectAble
export class CommandService {
  constructor(private repository: MockRepository) {}

  async save(data: Partial<Data>) {
    if (data.id) return this.repository.update(data.id, data.content || '');
    this.repository.insert(data.content || '');
  }
  async delete(id: Data['id']) {
    this.repository.delete(id);
  }
}
