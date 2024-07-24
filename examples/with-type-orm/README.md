# Example with-type-orm

## Installation

1. Install module:

```bash
npm install flex-injector typeorm
```

2. Install database module:
   You need to install a database module supported by TypeORM, such as MySQL, PostgreSQL, etc.

```bash
# In this example, we use sql.js, a database driver that does not require any additional setup for demonstration purposes.
npm install sql.js
```

3. Install peer dependencies:

```bash
npm install reflect-metadata
```

4. tsconfig.json compilerOptions :

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Project Structure

```bash
├── README.md
├── __test__
│   └── todo.test.ts
├── package.json
├── src
│   ├── domain
│   │   ├── todo
│   │   │   ├── todo.entity.ts
│   │   │   └── todo.repository.ts
│   │   └── user
│   │       ├── user.entity.ts
│   │       ├── user.repository.ts
│   │       └── user.service.ts
│   ├── injector.ts
│   └── orm-config.ts
├── tsconfig.json
└── vitest.config.ts
```

For detailed example code, please refer to the repository. The following files demonstrate the integration with TypeORM:

- src/injector.ts: flex-injector configuration.
- src/domain/user/user.repository.ts: UserRepository implementation.
- src/domain/user/user.service.ts: UserService implementation.
- src/orm-config.ts: TypeORM configuration.
- **test**/todo.test.ts: Test cases for the services.

You can find the complete example code in the repository.
