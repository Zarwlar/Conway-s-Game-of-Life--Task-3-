import Board from '../src/Model/Board'
import BoardController from '../src/Controller/BoardController'
import View from '../src/View/View'
import * as $ from 'jquery'
import { expect } from 'chai';

describe('Board Action', () => {

	beforeEach(() => {
		const canvas = document.createElement('canvas');
		canvas.classList.add('game__board');
		canvas.setAttribute('width', '990');
		canvas.setAttribute('height', '500');
		document.body.appendChild(canvas);


		const buttons = ['game__btn_play', 'game__btn_pause', 'game__btn_clear']; // add the rest ...
		buttons.forEach((name) => {
			const elem = document.createElement('button');
			elem.classList.add(name);
			document.body.appendChild(elem);
		});

		const inputs = ['game__board-width', 'game__board-height'];
		inputs.forEach((name) => {
			const elem = document.createElement('input');
			elem.classList.add(name);
			document.body.appendChild(elem);
		});
	});


	it('Инициализация пустого поля 10х10', () => {
		const board = new Board();
		expect([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]).to.deep.equal(board.board);
	});

	it('Инициализация поля с заданными размерами 5х7', () => {
		const board = new Board({
			rows: 5,
			cols: 7
		});
		expect([
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		]).to.deep.equal(board.board);
	});

	it('Обработка клика по клетке', () => {

		const controller = new BoardController();
		const view = new View(controller);
		const canvas = document.getElementsByClassName('game__board')[0];

		function click(el) {
			var ev = document.createEvent("MouseEvent");
			ev.initMouseEvent(
				"click",
				true, true,
				window, null,
				25, 133, 27, 135,
				false, false, false, false,
				0, null
			);
			el.dispatchEvent(ev);
		}

		click(canvas);

		expect([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]).to.deep.equal(controller.board.board);
	});

	it('Получение следующего поколения', () => {

		const controller = new BoardController();
		const view = new View(controller);
		controller.board.preset([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]);

		console.log(controller.board.board, 'Первый');
		console.log(controller.board.getNextGen(), 'Второй');


		expect([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]).to.deep.equal(controller.board.board);
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});


});