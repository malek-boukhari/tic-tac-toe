import { program } from 'commander';

import { GameServer } from './GameServer';

const gameServer = new GameServer();

program
    .version('1.0.0')
    .description('Game server')
    .action(async () => {
        await gameServer.start();
    });

program.parse(process.argv);
