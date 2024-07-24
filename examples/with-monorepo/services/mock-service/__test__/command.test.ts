import { describe, it, expect, beforeEach } from 'vitest';
import { CommandService } from '../src/command.service';
import { MockRepository } from '../src/mock-database-repository';

describe('CommandService', () => {
  let commandService: CommandService;
  let mockRepository: MockRepository;

  beforeEach(() => {
    mockRepository = new MockRepository();
    commandService = new CommandService(mockRepository);
  });

  it('should save new data', async () => {
    const content = 'test content';
    await commandService.save({ content });

    const data = mockRepository.select()[0];
    expect(data?.content).toBe(content);
    expect(data?.id).toBeDefined();
  });

  it('should update existing data', async () => {
    const content = 'test content';
    mockRepository.insert(content);
    const data = mockRepository.select()[0];

    const newContent = 'updated content';
    await commandService.save({ id: data?.id, content: newContent });

    const updatedData = mockRepository.select(data?.id)[0];
    expect(updatedData?.content).toBe(newContent);
  });

  it('should delete data by id', async () => {
    const content = 'test content';
    mockRepository.insert(content);
    const ids = mockRepository.select().map(v => v!.id);
    expect(ids.length).toBeGreaterThan(0);

    await Promise.all(ids.map(id => commandService.delete(id)));

    const result = mockRepository.select();
    expect(result).toEqual([]);
  });
});
