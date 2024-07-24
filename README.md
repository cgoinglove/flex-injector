# Flex-Injector

[![npm version](https://badge.fury.io/js/flex-injector.svg)](https://badge.fury.io/js/flex-injector) [![Downloads](https://img.shields.io/npm/dt/flex-injector.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/flex-injector)

English | [한국어](./docs/lang/kr.md)

Flex-Injector is a **library that makes dependency injection easy**. This library utilizes TypeScript's decorator feature to manage dependencies in a simple and clear way.

Using `createInjector`, you can create **multiple injectors and inject dependencies through different containers**. This is particularly useful in a `monorepo` environment. Each package or module can use an independent injector, making dependency management more efficient and clear.

- [Flex-Injector](#flex-injector)
  - [Installation](#installation)
  - [Example of usage](#example-of-usage)
    - [❌ Bad Case](#-bad-case)
  - [More examples](#more-examples)

## Installation

1. Install module:

```bash
npm install flex-injector
```

2. Install peer dependencies:

```bash
npm install reflect-metadata
```

3. tsconfig.json compilerOptions :

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Example of usage

```
./service
├── todo.service.ts
├── user.service.ts
└── injector.ts
```

```typescript
//  ./service/injector.ts

import { createInjector } from 'flex-injector';

const { InjectAble, inject } = createInjector();

export { InjectAble, inject };
```

```typescript

//  ./service/todo.service.ts

import { InjectAble } from './injector';

@InjectAble
export class TodoService {

  async getTodo(userId:string) {
    return ...;
  }
}
```

```typescript

//  ./service/user.service.ts

import { InjectAble } from './injector';

@InjectAble
export class UserService {

  constructor(private todoService: TodoService) {}


  async getTodo(userId:string) {
    return this.todoService.getTodo(userId);
  }

  async find(userId:string) {
    return ...;
  }
}
```

```typescript
// express server example

const userService = inject(UserService);

app.get('/todo', async (req, res) => {
  const todoList = await userService.getTodo(req.session.userId);
  res.json(todoList);
});
```

<br/>

#### ❌ Bad Case

```typescript
//  Beware of circular reference errors. Below is a bad example where circular references occur.

const { inject, InjectAble } = createInjector();

@InjectAble
class A {
  constructor(private b: B) {}
}

@InjectAble
class B {
  constructor(private a: A) {}
}

const a = inject(A); // Throw Circular dependency detected
```

## More examples

> - **[✅ With next](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-next)**
> - **[✅ With type-orm](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-type-orm)**
> - **[✅ With express](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-express)**
> - **[✅ With monorepo](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-monorepo)**
> - **[🛠️ With client side](#)**
