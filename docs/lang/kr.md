# Flex-Injector

[![npm version](https://badge.fury.io/js/flex-injector.svg)](https://badge.fury.io/js/flex-injector)

Flex-Injector는 **의존성 주입을 간편하게 할 수 있도록 돕는 라이브러리**입니다. 이 라이브러리는 TypeScript의 데코레이터 기능을 활용하여 의존성 관리를 쉽고 명확하게 할 수 있습니다.

createInjector를 사용하여 **여러 개의 인젝터를 생성하고, 이를 통해 서로 다른 컨테이너로 의존성을 주입**할 수 있습니다. 이는 특히 `monorepo` 환경에서 매우 유용합니다. 각 패키지나 모듈별로 독립적인 인젝터를 사용할 수 있어, 의존성 관리가 더욱 효율적이고 명확해집니다.

## 설치

1. 모듈 설치:

```bash
npm install flex-injector
```

2. 피어 종속성 설치:

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

## 사용 예

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
// 순환 참조 에러에 주의하세요. 아래는 순환 참조가 발생하는 나쁜 예시입니다.

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

## 더 많은 예

> - **[✅ With next](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-next)**
> - **[✅ With type-orm](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-type-orm)**
> - **[🛠️ With express](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-express)**
> - **[🛠️ With monorepo](https://github.com/cgoinglove/flex-injector/tree/main/examples/with-monorepo)**
