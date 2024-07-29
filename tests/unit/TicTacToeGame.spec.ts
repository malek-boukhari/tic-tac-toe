import { expect } from 'chai';

import { TicTacToeGame } from '../../src/games/TicTacToeGame';

describe('TicTacToeGame', () => {
    let game: TicTacToeGame;

    beforeEach(() => {
        game = TicTacToeGame.getInstance();
    });

    afterEach(() => {
        // Tear down
        game.clear();
    });

    it('should initialize the game correctly', () => {
        expect(game.getCurrentPlayer()).to.be.equal('X');
        expect(game.getStats()).to.deep.equal({ X: 0, O: 0, Draw: 0 });
        expect(game.getGameResult()).to.be.null;
        expect(game.hasGameEnded()).to.be.false;
    });

    it('should be able to make a valid move', () => {
        game.makeMove(0, 0);
        expect(game.getCurrentPlayer()).to.be.equal('O');
    });

    it('should throw an error when a cell is occupied', () => {
        game.makeMove(0, 0);

        expect(() => game.makeMove(0, 0)).to.throw('Cell is already occupied');
    });

    it('should throw an error when the input is out out of range move', () => {
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
        game.makeMove(0, 0); // X
        game.makeMove(0, 1); // O
        game.makeMove(1, 0); // X
        game.makeMove(1, 1); // O
        game.makeMove(2, 0); // X wins

        expect(game.getGameResult()).to.be.equal('X');
        expect(game.hasGameEnded()).to.be.true;
    });

    it('should detect a win in the main diagonal', () => {
        game.makeMove(0, 0); // X
        game.makeMove(0, 1); // O
        game.makeMove(1, 1); // X
        game.makeMove(0, 2); // O
        game.makeMove(2, 2); // X wins

        expect(game.getGameResult()).to.be.equal('X');
        expect(game.hasGameEnded()).to.be.true;
    });

    it('should detect a win in the anti diagonal', () => {
        game.makeMove(0, 2); // X
        game.makeMove(0, 1); // O
        game.makeMove(1, 1); // X
        game.makeMove(0, 0); // O
        game.makeMove(2, 0); // X wins

        expect(game.getGameResult()).to.be.equal('X');
        expect(game.hasGameEnded()).to.be.true;
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
        expect(game.hasGameEnded()).to.be.true;
    });

    it('should log stats correctly', () => {
        game.makeMove(0, 2); // X
        game.makeMove(1, 1); // O
        game.makeMove(0, 1); // X
        game.makeMove(1, 0); // O
        game.makeMove(0, 0); // X wins

        expect(game.getGameResult()).to.be.equal('X');
        expect(game.hasGameEnded()).to.be.true;
        expect(game.getStats()).to.deep.equal({ X: 1, O: 0, Draw: 0 });
    });

    it('should reset the game correctly', () => {
        game.makeMove(0, 0); // X
        game.makeMove(1, 0); // O
        game.makeMove(0, 1); // X
        game.makeMove(1, 1); // O
        game.makeMove(0, 2); // X wins

        // Make sure it doesn't allow making a move after the game has ended
        expect(() => game.makeMove(0, 3)).to.throw('The game is over! Please start a new game');

        game.resetGame();

        expect(game.getCurrentPlayer()).to.equal('O'); // O should start, since he lost the previous game
        expect(game.getGameResult()).to.be.null;
        expect(game.hasGameEnded()).to.be.false;
    });
});
