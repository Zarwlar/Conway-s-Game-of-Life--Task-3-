import Board from '../src/Model/Board'
import BoardController from '../src/Controller/BoardController'
import View from '../src/View/View'
import App from '../src/main'
import * as $ from 'jquery'
import { expect } from 'chai';

describe('Board Action', () => {

  it('Инициализация пустого поля 10х10', () => {
		const board = new Board();
		expect([[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0]]).to.deep.equal(board.board);
  });

	  it('Инициализация поля с заданными размерами 5х7', () => {
		const board = new Board({rows: 5, cols: 7});
		expect([[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0]]).to.deep.equal(board.board);
  });

	  it('Обработка клика по клетке', () => {
		const board = new Board();
		const controller = new BoardController(board);
		const view = new View(controller);

		expect([[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0]]).to.deep.equal(board.board);

  });

});
