import { expect } from 'chai';

import { TicTacToeGame } from '../../src/games/TicTacToeGame';

describe('Test TicTacToeGame', () => {
    let game: TicTacToeGame;

    beforeEach(() => {
        game = TicTacToeGame.getInstance();
    });

    afterEach(() => {
        // Tear down
        game.clear();
    });

    describe('Test initialize', () => {
        it('should initialize the game correctly', () => {
            expect(game.getCurrentPlayer()).to.be.equal('X');
            expect(game.getStats()).to.deep.equal({ X: 0, O: 0, Draw: 0 });
            expect(game.getGameResult()).to.be.null;
            expect(game.hasGameEnded()).to.be.false;
        });
    });

    describe('createBoard', () => {
        it('should create a board with the specified size and initialize each cell with an empty string', () => {
            // Clear the game instance first
            game.clear();

            const boardSize = 3;
            const gameInstance = TicTacToeGame.getInstance(boardSize);

            // Access private createBoard method
            const createBoard = (gameInstance as any).createBoard.bind(gameInstance);
            const board = createBoard();

            // Check the dimensions of the board
            expect(board).to.have.lengthOf(boardSize);
            board.forEach((row: string[]) => {
                expect(row).to.have.lengthOf(boardSize);
                row.forEach((cell: string) => {
                    // Check if each cell is initialized with an empty string
                    expect(cell).to.equal(' ');
                });
            });
        });
    });

    describe('Test makeMove', () => {
        it('should be able to make a valid move', () => {
            game.makeMove(0, 0); // X starts
            expect(game.getCurrentPlayer()).to.be.equal('O'); // make sure player has changed after the move

            game.makeMove(1, 0); // O
            expect(game.getCurrentPlayer()).to.be.equal('X');

            expect(game.getBoard()[0][0]).to.be.equal('X');
            expect(game.getBoard()[1][0]).to.be.equal('O');
        });

        it('should throw an error when the input is out out of range', () => {
            expect(() => game.makeMove(-1, 0)).to.throw('Invalid row index');
            expect(() => game.makeMove(0, -1)).to.throw('Invalid column index');
            expect(() => game.makeMove(3, 0)).to.throw('Invalid row index');
            expect(() => game.makeMove(0, 3)).to.throw('Invalid column index');
        });

        it('should throw an error when a cell is occupied', () => {
            game.makeMove(0, 0);

            expect(() => game.makeMove(0, 0)).to.throw('Cell is already occupied');
        });
    });

    describe('Test checkWinner', () => {
        it('should detect a win in a row', () => {
            // Simulate a game where X wins
            game.makeMove(0, 0); // X
            game.makeMove(1, 0); // O
            game.makeMove(0, 1); // X
            game.makeMove(1, 1); // O
            game.makeMove(0, 2); // X wins

            expect(game.getGameResult()).to.be.equal('X');
        });

        it('should detect a win in a column', () => {
            game.makeMove(0, 0); // X
            game.makeMove(0, 1); // O
            game.makeMove(1, 0); // X
            game.makeMove(1, 1); // O
            game.makeMove(2, 0); // X wins

            expect(game.getGameResult()).to.be.equal('X');
        });

        it('should detect a win in the main diagonal', () => {
            game.makeMove(0, 0); // X
            game.makeMove(0, 1); // O
            game.makeMove(1, 1); // X
            game.makeMove(0, 2); // O
            game.makeMove(2, 2); // X wins

            expect(game.getGameResult()).to.be.equal('X');
        });

        it('should detect a win in the anti diagonal', () => {
            game.makeMove(0, 2); // X
            game.makeMove(0, 1); // O
            game.makeMove(1, 1); // X
            game.makeMove(0, 0); // O
            game.makeMove(2, 0); // X wins

            expect(game.getGameResult()).to.be.equal('X');
        });

        it('should detect a draw', () => {
            // Simulate a draw
            game.makeMove(0, 0); // X
            game.makeMove(0, 1); // O
            game.makeMove(0, 2); // X
            game.makeMove(1, 1); // O
            game.makeMove(1, 0); // X
            game.makeMove(1, 2); // O
            game.makeMove(2, 1); // X
            game.makeMove(2, 0); // O
            game.makeMove(2, 2); // X

            expect(game.getGameResult()).to.be.equal('Draw');
        });
    });

    describe('Test gameResult', () => {
        it('should not be able to get game results when a game is running', () => {
            expect(game.getGameResult()).to.be.null;
            expect(game.hasGameEnded()).to.be.false;
        });

        it('should be able to get game results', () => {
            game.makeMove(0, 1); // X
            game.makeMove(1, 1); // O
            game.makeMove(0, 2); // X
            game.makeMove(1, 0); // O
            game.makeMove(0, 0); // X wins

            expect(game.hasGameEnded()).to.be.true;
            expect(game.getGameResult()).to.be.equal('X');
        });
    });

    describe('Test stats', () => {
        it('should log stats correctly', () => {
            expect(game.getStats()).to.deep.equal({ X: 0, O: 0, Draw: 0 });

            game.makeMove(0, 2); // X
            game.makeMove(1, 1); // O
            game.makeMove(0, 1); // X
            game.makeMove(1, 0); // O
            game.makeMove(0, 0); // X wins

            expect(game.getStats()).to.deep.equal({ X: 1, O: 0, Draw: 0 });
        });
    });

    describe('Test resetGame', () => {
        it('should reset the game correctly', () => {
            game.makeMove(0, 0); // X
            game.makeMove(1, 0); // O
            game.makeMove(0, 1); // X
            game.makeMove(1, 1); // O
            game.makeMove(0, 2); // X wins

            // Make sure it doesn't allow making a move after the game has ended
            expect(() => game.makeMove(1, 2)).to.throw('The game is over! Please start a new game');

            game.resetGame();

            expect(game.getCurrentPlayer()).to.equal('O'); // O should start, since he lost the previous game
            expect(game.getGameResult()).to.be.null;
            expect(game.hasGameEnded()).to.be.false;
        });
    });

    describe('Test clear game', () => {
        it('should clear the game instance', () => {
            it('should clear the game instance', () => {
                // Get the instance
                const gameInstance = TicTacToeGame.getInstance();
                expect(gameInstance).to.not.be.null;

                // Call the clear method
                gameInstance.clear();

                // Access the private instance property for testing
                const privateInstance = (TicTacToeGame as any).instance;

                // Verify that the instance is set to null
                expect(privateInstance).to.be.null;
            });
        });
    });
});
