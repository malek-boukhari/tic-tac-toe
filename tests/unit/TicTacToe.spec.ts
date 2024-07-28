import { expect } from 'chai';

import { TicTacToeGame } from '../../src/TicTacToeGame';

describe('TicTacToe', () => {
    let game: TicTacToeGame;

    beforeEach(() => {
        game = TicTacToeGame.getInstance();
        game.clear();
    });

    it('should initialize the game correctly', () => {
        expect(game.getCurrentPlayer()).to.be.equal('X');
        expect(game.getStats()).to.deep.equal({ X: 0, O: 0, Draw: 0 });
        expect(game.getGameResult()).to.be.null;
        expect(game.hasGameEnded()).to.be.false;
    });

    it('should make a valid move', () => {
        game.makeMove(0, 0);
        expect(game.getCurrentPlayer()).to.be.equal('O');
    });

    it('should throw an error for invalid move (occupied cell)', () => {
        game.makeMove(0, 0);
        expect(() => game.makeMove(0, 0)).to.throw('Cell is already occupied');
    });

    it('should throw an error for invalid move (occupied cell)', () => {
        game.makeMove(0, 0);
        try {
            game.makeMove(0, 0);
        } catch (error) {
            console.log('Error caught:', error.message);
            expect(error.message).to.equal('Cell is already occupied');
        }
    });

    it('should throw an error for out of range move', () => {
        expect(() => game.makeMove(-1, 0)).to.throw('Invalid row index');
        expect(() => game.makeMove(0, -1)).to.throw('Invalid column index');
        expect(() => game.makeMove(3, 0)).to.throw('Invalid row index');
        expect(() => game.makeMove(0, 3)).to.throw('Invalid column index');
    });

    it('should detect a win in a row', () => {
        // Simulate a game where X wins
        game.makeMove(0, 0); // X
        game.makeMove(1, 0); // O
        game.makeMove(0, 1); // X
        game.makeMove(1, 1); // O
        game.makeMove(0, 2); // X wins
        expect(game.getGameResult()).to.be.equal('X');
        expect(game.hasGameEnded()).to.be.true;
    });

    it('should detect a win in a column', () => {
        console.info(game.getCurrentPlayer());
        game.makeMove(0, 0); // X
        game.makeMove(0, 1); // O
        game.makeMove(1, 0); // X
        game.makeMove(1, 1); // O
        game.makeMove(2, 0); // X wins
        expect(game.getGameResult()).to.be.equal('X');
        expect(game.hasGameEnded()).to.be.true;
    });

    // it('should detect a win in the main diagonal', () => {
    //     game.makeMove(0, 0); // X
    //     game.makeMove(0, 1); // O
    //     game.makeMove(1, 1); // X
    //     game.makeMove(0, 2); // O
    //     game.makeMove(2, 2); // X wins
    //     expect(game.getGameResult()).to.be.equal('X');
    //     expect(game.hasGameEnded()).to.be.true;
    // });

    // it('should detect a win in the anti-diagonal', () => {
    //     game.makeMove(0, 2); // X
    //     game.makeMove(0, 1); // O
    //     game.makeMove(1, 1); // X
    //     game.makeMove(0, 0); // O
    //     game.makeMove(2, 0); // X wins
    //     expect(game.getGameResult()).to.be.equal('X');
    //     expect(game.hasGameEnded()).to.be.true;
    // });

    // it('should detect a draw', () => {
    //     // Simulate a draw
    //     game.makeMove(0, 0); // X
    //     game.makeMove(0, 1); // O
    //     game.makeMove(0, 2); // X
    //     game.makeMove(1, 1); // O
    //     game.makeMove(1, 0); // X
    //     game.makeMove(1, 2); // O
    //     game.makeMove(2, 1); // X
    //     game.makeMove(2, 0); // O
    //     game.makeMove(2, 2); // X
    //     expect(game.getGameResult()).to.be.equal('Draw');
    //     expect(game.hasGameEnded()).to.be.true;
    // });

    // it('should reset the game correctly', () => {
    //     // Simulate a game where X wins
    //     game.makeMove(0, 0); // X
    //     game.makeMove(1, 0); // O
    //     game.makeMove(0, 1); // X
    //     game.makeMove(1, 1); // O
    //     game.makeMove(0, 2); // X wins
    //     game.resetGame();
    //     // expect(game.getCurrentPlayer()).toBe('O'); // X won, so O should start
    //     // expect(game.getGameResult()).toBeNull();
    //     // expect(game.hasGameEnded()).toBe(false);
    //     // // Check the board state
    //     // const board = game.getBoard();
    //     // for (let row = 0; row < 3; row++) {
    //     //     for (let col = 0; col < 3; col++) {
    //     //         expect(board[row][col]).toBe(' ');
    //     //     }
    //     // }
    // });
});
