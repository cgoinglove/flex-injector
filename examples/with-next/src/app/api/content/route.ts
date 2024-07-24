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
