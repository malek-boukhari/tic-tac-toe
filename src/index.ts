import { program } from 'commander';

import { GameCommands } from './GameCommands';

const gameCommands = new GameCommands();

program
    .version('1.0.0')
    .description('Tic Tac Toe Game')
    .action(async () => {
        await gameCommands.start();
    });

program.parse(process.argv);
