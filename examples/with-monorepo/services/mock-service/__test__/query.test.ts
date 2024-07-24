import { describe, it, expect, beforeEach } from 'vitest';
import { QueryService } from '../src/query.service';
import { MockRepository } from '../src/mock-database-repository';

describe('QueryService', () => {
  let queryService: QueryService;
  let mockRepository: MockRepository;

  beforeEach(() => {
    mockRepository = new MockRepository();
    queryService = new QueryService(mockRepository);
  });

  it('should find data by id', async () => {
    const content = 'test content';
    mockRepository.insert(content);
    const data = mockRepository.select()[0];

    const result = await queryService.findById(data!.id);
    expect(result).toEqual(data);
  });

  it('should check if data exists by id', async () => {
    const content = 'test content';
    mockRepository.insert(content);
    const data = mockRepository.select()[0];

    const exists = await queryService.exits(data!.id);
    expect(exists).toBe(true);

    const notExists = await queryService.exits('non-existing-id');
    expect(notExists).toBe(false);
  });
});
