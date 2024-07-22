import 'reflect-metadata';
import { createInjector } from 'ts-dependency-injector';

const { InjectAble, inject } = createInjector();
export { InjectAble, inject };
