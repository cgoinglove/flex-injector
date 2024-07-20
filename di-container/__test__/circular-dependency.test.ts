import { describe, it, expect } from 'vitest';
import { createInjector } from '../src';

describe('createInjector Circular Dependency Tests', () => {
  const { inject, InjectAble } = createInjector();

  @InjectAble
  class ServiceA {
    constructor(private serviceB: ServiceB) {}
  }

  @InjectAble
  class ServiceB {
    constructor(private serviceA: ServiceA) {}
  }

  it('should throw an error for circular dependencies', () => {
    expect(() => inject(ServiceB)).toThrowError(/Circular dependency detected/);
  });
});
