import fs from 'fs';
import path from 'path';

import type { GameStats } from '../games/TicTacToeGame';

export class StatsHistoryService {
    private readonly statsFilePath: string;

    constructor() {
        this.statsFilePath = path.resolve(__dirname, '../db/statsHistory.json');
    }

    public loadHistory(): GameStats {
        let stats: GameStats = { X: 0, O: 0, Draw: 0 };

        try {
            if (!fs.existsSync(this.statsFilePath)) {
                console.error('There was a trouble locating the save file');
                return stats;
            }

            const data = fs.readFileSync(this.statsFilePath, 'utf-8');
            stats = JSON.parse(data);
        } catch (error) {
            console.error('Error reading stats:', error.message);
        }

        return stats;
    }

    public saveStats(newStats: GameStats): void {
        const existingStats: GameStats = this.loadHistory();

        // Update existing stats with new stats
        const updatedStats: GameStats = {
            X: existingStats.X + newStats.X,
            O: existingStats.O + newStats.O,
            Draw: existingStats.Draw + newStats.Draw
        };

        try {
            fs.writeFileSync(this.statsFilePath, JSON.stringify(updatedStats, null, 2));
        } catch (error) {
            console.error('Error saving stats:', error.message);
        }
    }
}
