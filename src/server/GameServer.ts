import pc from 'picocolors';
import { confirm, input } from '@inquirer/prompts';

import { StatsHistoryService } from '../services/StatsHistoryService';
import { TicTacToeGame } from '../games/TicTacToeGame';

import type { GameResult, GameStats, Player } from '../games/TicTacToeGame';

export class GameServer {
    private game: TicTacToeGame;
    private statsHistoryService: StatsHistoryService;

    constructor() {
        this.game = null;
        this.statsHistoryService = new StatsHistoryService();
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
        console.clear();
        this.game.printBoard();
        await this.gameLoop();
    }

    private async gameLoop(): Promise<void> {
        console.info(
            pc.yellow(
                'At anytime given time, press "e" to exit, "p" to print current stats, "h" to print stats history'
            )
        );
        let isPlaying = true;

        while (isPlaying) {
            console.info(); // Add a new line for better readability

            if (this.game.hasGameEnded()) {
                this.printGameResults();
            }

            const ipt = await input({ message: this.printInputMessage() });

            if (ipt.toLowerCase() === 'e') {
                this.saveAndQuit();
                isPlaying = false;
                break;
            }

            if (ipt.toLowerCase() === 'p') {
                this.printCurrentStats();
                continue;
            }

            if (ipt.toLowerCase() === 'h') {
                this.printStatsHistory();
                continue;
            }

            if (ipt === '') {
                this.handleEnterKeyPress();
                continue;
            }

            // Extract row and column from the input
            const [row, col] = ipt.split(':').map(Number);
            if (isNaN(row) || isNaN(col)) {
                console.error(`Invalid input: ${ipt}. Please enter row and column as "row:col".`);
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

        console.info(`Player ${this.themedPlayer(winner)} wins! 🎉`);
    }

    private handleEnterKeyPress(): void {
        if (!this.game.hasGameEnded()) {
            console.error('You can only start a new game after the current game is over.');
            return;
        }

        // Start a new game if the current game has ended
        this.startNewGame();
    }

    private printCurrentStats(): void {
        console.clear();
        const stats = this.game.getStats();

        console.info(pc.bold('*** Current game Stats ***'));
        this.printStats(stats);
    }

    private printStatsHistory(): void {
        try {
            console.clear();
            const stats: GameStats = this.statsHistoryService.loadHistory();

            console.info(pc.bold('*** Stats history ***'));
            this.printStats(stats);
        } catch (error) {
            console.error('Error loading stats:', error.message);
        }
    }

    private printStats(stats: GameStats): void {
        console.info(`Player ${this.themedPlayer('X')} wins: ${stats.X}`);
        console.info(`Player ${this.themedPlayer('O')} wins: ${stats.O}`);
        console.info(`Draw games: ${stats.Draw}`);
    }

    // Returns the player with the color theme: X in blue, O in magenta
    private themedPlayer(player: Player): string {
        return player === 'X' ? pc.blue(player) : pc.magenta(player);
    }

    // Saves the current game and clears the game instance
    private saveAndQuit(): void {
        console.clear();
        this.statsHistoryService.saveStats(this.game.getStats());
        this.game.clear();
        console.info('Thank you for playing. See you soon 💗');
    }
}
