import { inject as mockInject, QueryService, CommandService } from '@service/mock';
import { inject as todoInject, AppDataSource, UserService } from '@service/todo';

const queryService = mockInject(QueryService);
const commandService = mockInject(CommandService);

const userService = todoInject(UserService);

commandService.save({ content: 'Hello' });
commandService.save({ content: 'World' });

export default async function Home() {
  await AppDataSource.initialize();
  const user = await userService.getAllUsers().then(users => {
    if (users.length) return users[0];
    return userService.createUser({ name: 'cgoing' });
  });
  const items = await queryService.findAll();
  //  or
  // const items  = await fetch('/api/content').then(res=>res.json())

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-3">
          <div className="w-full ring-1 ring-red-200 px-4 py-3 font-bold">{JSON.stringify(user)}</div>
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
