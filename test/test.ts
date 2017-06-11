import Board from '../src/Model/Board'
import BoardController from '../src/Controller/BoardController'
import View from '../src/View/View'
import App from '../src/main'
import { expect } from 'chai'

describe('Board Action', () => {
  it('Инициализация пустого поля 10х10', () => {

		var board = new Board({cols: 10, rows: 10});
		// expect(2+2).to.equal(4);
  });
});