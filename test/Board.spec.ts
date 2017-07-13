import { expect } from 'chai';
import Board from '../src/Model/Board';

describe('Тест Board', () => {

    it('Должен создать поле 10х10 из нулей', () => {
        const board: Board = new Board();

        const expectCellMatrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

        expect(expectCellMatrix).to.deep.equal(board.cellmatrix);
    });

    it('Должен вернуть живую клетку', () => {
        const board: Board = new Board();
        board.preset([[0, 0, 1],
                      [0, 0, 0],
                      [0, 1, 0]]);
        const livingCell = board.getCellState(0, 2);
        expect(1).equal(livingCell);
    });

    it('Должен вернуть мёртвую клетку', () => {
            const board: Board = new Board();
            board.preset([[0, 0, 1],
                          [0, 0, 0],
                          [0, 1, 0]]);
            const deadCell = board.getCellState(1, 1);
            expect(0).equal(deadCell);
        });

    it('Должен поменять состояние клетки: Ж->М', () => {
        const board: Board = new Board();
        board.preset([[0, 0, 1],
                      [0, 0, 0],
                      [0, 1, 0]]);
        board.toggleState(0, 2);
        expect(0).equal(board.getCellState(0, 2));
    });

    it('Должен поменять состояние клетки: М->Ж', () => {
        const board: Board = new Board();
        board.preset([[0, 0, 1],
                      [0, 0, 0],
                      [0, 1, 0]]);
        board.toggleState(1, 1);
        expect(1).equal(board.getCellState(1, 1));
    });

    it('Должен вернуть следующее поколение', () => {

        const board: Board = new Board();
        board.preset([[1, 0, 0, 0, 0],
                      [0, 1, 1, 0, 0],
                      [1, 1, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0]]);

        const expectNextGen = [[0, 1, 0, 0, 0],
                              [0, 0, 1, 0, 0],
                              [1, 1, 1, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0]];
        expect(expectNextGen).to.deep.equal(board.getNextGen());
    });

    it('Должен очистить доску', () => {

        const board: Board = new Board();
        board.preset([[1, 1, 0, 0, 0],
                      [0, 1, 1, 0, 0],
                      [1, 1, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0]]);

        const expectCellMatrix = [[0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0]];
        expect(expectCellMatrix).to.deep.equal(board.clear());
    });

    it('Должен очистить доску', () => {

        const board: Board = new Board();
        board.preset([[1, 1, 0, 0, 0],
                      [0, 1, 1, 0, 0],
                      [1, 1, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0]]);

        const expectCellMatrix = [[0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0]];
        expect(expectCellMatrix).to.deep.equal(board.clear());
    });

    it('Должен заполнить доску после ресайза', () => {

        const board: Board = new Board();
        board.preset([[1, 1, 1, 0, 1],
                      [1, 1, 1, 0, 1],
                      [1, 1, 1, 0, 1],
                      [0, 0, 0, 0, 1],
                      [1, 1, 1, 1, 1]]);

        board.fillResizedBoard(7, 7);

        const expectCellMatrix = [[1, 1, 1, 0, 1, 0, 0],
                      [1, 1, 1, 0, 1, 0, 0],
                      [1, 1, 1, 0, 1, 0, 0],
                      [0, 0, 0, 0, 1, 0, 0],
                      [1, 1, 1, 1, 1, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0]];

        expect(expectCellMatrix).to.deep.equal(board.cellmatrix);
    });

});
