import { inject } from './injector';
import { CommandService } from './service/command.service';

const command = inject(CommandService);

let shouldBeBoot = true;

export const Boot = () => {
  if (!shouldBeBoot) return;
  shouldBeBoot = false;
  command.save({ content: 'Hello World' });
  command.save({ content: 'Flex Injector With Next.js' });
};
