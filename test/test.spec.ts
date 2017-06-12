import Board from '../src/Model/Board'
import BoardController from '../src/Controller/BoardController'
import View from '../src/View/View'
import App from '../src/main'
import { expect } from 'chai'
import * as $ from 'jquery'

describe('Board Action', () => {
  it('Инициализация пустого поля 10х10', () => {

		var board = new Board();
		expect([[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0]]).to.equal(board.board);
  });
});