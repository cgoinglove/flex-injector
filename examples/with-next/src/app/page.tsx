import { inject } from '@/injector';
import { QueryService } from '@/service/query.service';

const queryService = inject(QueryService);

export default async function Home() {
  const items = await queryService.findAll();
  //  or
  // const items  = await fetch('/api/content').then(res=>res.json())

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
