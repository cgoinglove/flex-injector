# Example with-monorepo

This project is an example of using [flex-injector](https://github.com/cgoinglove/flex-injector) combined with [turborepo](https://turbo.build/repo/docs).

Using `flex-injector`, you can separate service layers within a monorepo environment and create independent service packages. This approach not only allows you to inject and use only the necessary services in your application, but also helps manage dependencies at both the service and package levels. This provides developers with an experience similar to microservices architecture `(MSA)`, maximizing modular architecture and reusability.

You can find the complete example code in the repository.

## Project Structure

workspace

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'services/*'
```

```bash
#
apps
├── express app
├── next app
└── ...

packages
├── shared
├── config
└── ...

services
├── mock-service
├── todo-service
└── ...

```

## Usage in a Next.js App

By using flex-injector, you can inject services from different packages within a monorepo setup. In this example, @service/mock and @service/todo are two separate service packages. The inject function provided by flex-injector allows you to easily get instances of these services.

Mock Service: Injected using mockInject, providing QueryService and CommandService.
Todo Service: Injected using todoInject, providing UserService.
This approach enables you to maintain a modular codebase, where each service is independently developed and maintained, while still being able to integrate them seamlessly in your application.

This is particularly useful in a monorepo structure, as it promotes code reusability and separation of concerns, making your application easier to manage and scale.

```json
//  apps/docs/package.json
  "dependencies": {
    "@repo/ui": "workspace:*",
    "typeorm": "^0.3.20",
    "next": "^14.2.3",
    "react": "^18.2.0",
    "reflect-metadata": "^0.2.2",
    "@service/todo": "workspace:*",
    "@service/mock": "workspace:*"
  },
```

```typescript
import { inject as mockInject, QueryService, CommandService } from '@service/mock';
import { inject as todoInject, AppDataSource, UserService } from '@service/todo';

const queryService = mockInject(QueryService);
const commandService = mockInject(CommandService);

const userService = todoInject(UserService);

export default async function Home(){
    const user = await userService.getAllUsers();

    return <main>
            <Component user={user}/>
           </main>
}
```
