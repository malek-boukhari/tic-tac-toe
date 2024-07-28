export type Player = 'X' | 'O';
export type Cell = Player | ' ';
export type Board = Cell[][];
export type GameResult = 'X' | 'O' | 'Draw';
export type GameStats = {
    X: number;
    O: number;
    Draw: number;
};

export class TicTacToeGame {
    private static instance: TicTacToeGame | null = null;
    private readonly boardSize: number;
    private currentPlayer: Player;
    private board: Board;
    private moveCount: number;
    private gameEnded: boolean;
    private stats: GameStats;
    private gameResult: GameResult | null;

    private constructor(boardSize: number = 3) {
        this.boardSize = boardSize;
        this.currentPlayer = 'X';
        this.moveCount = 0;
        this.board = this.createBoard();
        this.gameEnded = false;
        this.gameResult = null;
        this.stats = {
            X: 0,
            O: 0,
            Draw: 0
        };
    }

    public static getInstance(): TicTacToeGame {
        if (!TicTacToeGame.instance) {
            TicTacToeGame.instance = new TicTacToeGame();
        }

        return TicTacToeGame.instance;
    }

    /*
     * Creates a new board with the specified size for the rows and columns
     * and initializes each cell with an empty string.
     */
    private createBoard(): Board {
        return Array.from({ length: this.boardSize }, () => {
            return Array.from({ length: this.boardSize }, () => ' ');
        });
    }

    public makeMove(row: number, col: number): void {
        if (this.hasGameEnded()) {
            throw new Error('The game is over! Please start a new game');
        }

        if (row < 0 || row >= this.boardSize) {
            throw new Error('Invalid row index');
        }

        if (col < 0 || col >= this.boardSize) {
            throw new Error('Invalid column index');
        }

        if (this.board[row][col] !== ' ') {
            throw new Error('Cell is already occupied');
        }

        this.board[row][col] = this.currentPlayer;
        this.moveCount++;

        if (this.checkWinner(row, col)) {
            this.stats[this.currentPlayer]++;
            this.gameEnded = true;
            this.gameResult = this.currentPlayer;

            return;
        }

        if (this.isBoardFull()) {
            this.stats.Draw++;
            this.gameEnded = true;
            this.gameResult = 'Draw';

            return;
        }

        // Set the current player to the next player
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    private checkWinner(row: number, col: number): boolean {
        // Check rows
        if (this.board[row].every((cell) => cell === this.currentPlayer)) {
            return true;
        }

        // Check columns
        if (this.board.every((boardRow) => boardRow[col] === this.currentPlayer)) {
            return true;
        }

        // Check main diagonal: The player is on the main diagonal if the row and column are equal (ex: 0,0; 1,1; 2,2)
        const isMainDiagonal: boolean = row === col;
        if (
            isMainDiagonal &&
            this.board.every((boardRow, y) => boardRow[y] === this.currentPlayer)
        ) {
            return true;
        }

        // Check anti-diagonal: The player is on the anti-diagonal if the sum of the row and column
        // is equal to the board size - 1 (ex: 0,2; 1,1; 2,0)
        const isAntiDiagonal: boolean = row + col === this.boardSize - 1;
        return (
            isAntiDiagonal &&
            this.board.every(
                (boardRow, index) => boardRow[this.boardSize - 1 - index] === this.currentPlayer
            )
        );
    }

    private isBoardFull(): boolean {
        return this.moveCount === this.boardSize ** 2;
    }

    private determineLoser(): Player {
        if (!this.gameResult || this.gameResult === 'Draw') {
            return 'X';
        }
        return this.gameResult === 'X' ? 'O' : 'X';
    }

    public resetGame(): void {
        this.currentPlayer = this.determineLoser();
        this.moveCount = 0;
        this.gameEnded = false;
        this.gameResult = null;
        this.board = this.createBoard();
    }

    // Clear the instance for testing purposes
    public clear(): void {
        TicTacToeGame.instance = null;
    }

    public printBoard(): void {
        for (let i = 0; i < this.boardSize; i++) {
            console.info(this.board[i].join(' | '));
            if (i < this.boardSize - 1) {
                console.info('-'.repeat(this.boardSize * 4 - 1));
            }
        }
    }

    public getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    public getStats(): GameStats {
        return this.stats;
    }

    public getGameResult(): GameResult {
        return this.gameResult;
    }

    public hasGameEnded(): boolean {
        return this.gameEnded;
    }
}
