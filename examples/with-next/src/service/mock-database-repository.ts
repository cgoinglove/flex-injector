import { InjectAble } from '@/injector';
import { randomUUID } from 'crypto';

export type Data = {
  id: string;
  content: string;
  createdTimestamp: number;
};

const table: Data[] = [];

@InjectAble
export class MockRepository {
  constructor() {}
  private findIndexById(id: Data['id']) {
    return table.findIndex(data => data.id == id);
  }
  private findById(id: Data['id']) {
    return table.find(data => data.id == id);
  }

  select(id?: Data['id']) {
    if (id != undefined) return this.findById(id);
    return table;
  }
  delete(id: Data['id']) {
    const index = this.findIndexById(id);
    if (~index) return;
    table.splice(index, 1);
  }
  insert(content: Data['content']) {
    table.push({
      id: randomUUID(),
      content,
      createdTimestamp: Date.now(),
    });
  }
  update(id: Data['id'], content: Data['content']) {
    const data = this.findById(id);
    if (!data) return;
    data.content = content;
  }
}
