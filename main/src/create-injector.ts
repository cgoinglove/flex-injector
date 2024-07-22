import { reflectFactory } from './reflect-factory';
import { randomUUID } from 'crypto';

type Class<T = any> = { new (...args: any[]): T };

export const createInjector = (name: string = randomUUID()) => {
  const Container = reflectFactory(`dependency-container-${name}`);

  const InjectAbleStorage = reflectFactory<true | Function>(`injectable-${name}`);

  const currentlyInjecting = new Set<Class>();

  const InjectAble = (clazz: Class) => {
    InjectAbleStorage.set(clazz, true);
  };
  const inject = <T>(Target: Class<T>): T => {
    if (!InjectAbleStorage.has(Target)) throw new Error(`${Target || 'Target'} is not injectable`);

    if (currentlyInjecting.has(Target)) {
      throw new Error(`Circular dependency detected: ${Target || 'Target'}`);
    }

    if (!Container.has(Target)) {
      currentlyInjecting.add(Target);
      const dependencies: Class[] =
        // @ts-ignore
        Reflect.getMetadata('design:paramtypes', Target) || [];

      // If Object is detected in dependencies, it might indicate a circular dependency due to TS limitations
      if (dependencies.some(dep => dep === Object)) {
        currentlyInjecting.delete(Target);
        throw new Error(`Circular dependency detected: ${Target.name || 'Target'}`);
      }

      const args: unknown[] = dependencies.map((C: Class) => Container.get(C) ?? inject(C));
      currentlyInjecting.delete(Target);
      const Component = new Target(...args);
      Container.set(Target, Component);
    }

    return Container.get(Target) as T;
  };

  return { inject, InjectAble };
};
