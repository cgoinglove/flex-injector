# Example with-next

This project is an example of using [flex-injector](https://github.com/cgoinglove/flex-injector) combined with [next.js](https://nextjs.org/).

## Installation

0. Install Next App

```bash
npx create-next-app@latest
# cd app dir
```

1. Install module:

```bash
npm install flex-injector
```

2. Install peer dependencies:

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
├── app
│   ├── api
│   │   └── content
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── boot.ts
├── injector.ts
└── service
    ├── command.service.ts
    ├── mock-database-repository.ts
    └── query.service.ts
```

## Example Code

```typescript
// app/page.tsx
import { inject } from '@/injector';
import { QueryService } from '@/service/query.service';

const queryService = inject(QueryService);

export default async function Home() {

  const items = await queryService.findAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <span className="ring-1 px-6 py-4 font-bold" key={item.id}>
              {item.content}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
```

```typescript
// app/api/content/route.ts
import { inject } from '@/injector';
import { CommandService } from '@/service/command.service';
import { Data } from '@/service/mock-database-repository';
import { QueryService } from '@/service/query.service';

const command = inject(CommandService);
const query = inject(QueryService);

export async function GET() {
  const list = await query.findAll();

  return Response.json(list);
}

export async function POST(req: Request) {
  const res: Pick<Data, 'content'> = await req.json();

  await command.save(res);

  return Response.json({ status: 200 });
}
```

You can find the complete example code in the repository.
