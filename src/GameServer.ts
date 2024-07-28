import { confirm, input } from '@inquirer/prompts';
import pc from 'picocolors';

import { TicTacToeGame } from './TicTacToeGame';

import type { GameResult, GameStats, Player } from './TicTacToeGame';

export class GameServer {
    private game: TicTacToeGame;

    constructor() {
        this.game = null;
    }

    public async start(): Promise<void> {
        const answer = await confirm({
            message: 'Do you want to play a game of Tic Tac Toe?'
        });

        if (!answer) {
            console.info('Maybe next time!');
            return;
        }

        this.game = TicTacToeGame.getInstance();
        this.game.printBoard();
        await this.gameLoop();
    }

    private async gameLoop(): Promise<void> {
        console.info(pc.green('Press "e" to exit, "p" to print stats'));
        let isPlaying = true;

        while (isPlaying) {
            console.info(); // Add a new line for better readability

            if (this.game.hasGameEnded()) {
                this.printGameResults();
            }

            const ipt = await input({ message: this.printInputMessage() });

            if (ipt.toLowerCase() === 'e') {
                this.sayGoodBye();
                isPlaying = false;
                break;
            }

            if (ipt.toLowerCase() === 'p') {
                this.printStats();
                continue;
            }

            if (ipt === '') {
                this.handleEnterKeyPress();
                continue;
            }

            // Extract row and column from the input
            const [row, col] = ipt.split(':').map(Number);
            if (isNaN(row) || isNaN(col)) {
                console.error('Invalid input. Please enter row and column as "row:col".');
                continue;
            }

            this.makeMove(row, col);
        }
    }

    private makeMove(row: number, col: number): void {
        try {
            console.clear();
            this.game.makeMove(row, col);
            this.game.printBoard();
        } catch (error) {
            console.error(error.message);
        }
    }

    private startNewGame(): void {
        console.clear();
        this.game.resetGame();
        this.game.printBoard();
    }

    private printInputMessage(): string {
        const player: Player = this.game.getCurrentPlayer();

        return this.game.hasGameEnded()
            ? 'Press "Enter" to start a new game.'
            : `Player ${this.themedPlayer(player)}, enter your move (row:col)`;
    }

    printGameResults(): void {
        const winner: GameResult = this.game.getGameResult();

        if (winner === 'Draw') {
            console.info('The game ended in a draw!');
            return;
        }

        console.info(`Player ${this.themedPlayer(winner)} wins!`);
    }

    private handleEnterKeyPress(): void {
        if (!this.game.hasGameEnded()) {
            console.error('You can only start a new game after the current game is over.');
            return;
        }

        // Start a new game if the current game has ended
        this.startNewGame();
    }

    private printStats(): void {
        console.clear();
        const stats: GameStats = this.game.getStats();

        console.info(pc.bold('Game Stats'));
        console.info(`Player ${this.themedPlayer('X')} wins: ${stats.X}`);
        console.info(`Player ${this.themedPlayer('O')} wins: ${stats.O}`);
        console.info(`Draw games: ${stats.Draw}`);
    }

    // Returns the player with the color theme: X in blue, O in magenta
    private themedPlayer(player: Player): string {
        return player === 'X' ? pc.blue(player) : pc.magenta(player);
    }

    private sayGoodBye(): void {
        console.clear();
        this.game.clear();
        console.info('Thanks for playing!');
    }
}
