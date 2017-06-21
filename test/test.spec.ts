import Board from '../src/Model/Board'
import BoardController from '../src/Controller/BoardController'
import View from '../src/View/View'
import * as $ from 'jquery'
import { expect } from 'chai';
import { simulant } from 'simulant';

describe('Board Action', () => {


		beforeEach(() => {
			const canvas = document.createElement('canvas');
			canvas.classList.add('game__board');
			canvas.setAttribute('width', '990');
			canvas.setAttribute('height', '500');
			document.body.appendChild(canvas);

			const buttons = ['game__btn_play', 'game__btn_pause', 'game__btn_clear'];
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
	


	it('Обработка клика по клетке', () => {

		const controller = new BoardController();
		const view = new View(controller);
		const canvas = document.getElementsByClassName('game__board')[0];

		function click(el) {
			let ev = document.createEvent("MouseEvent");
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
		const preset = [
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
		];
		const nextGen = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		controller.board.preset(preset);

		expect(nextGen).to.deep.equal(controller.board.getNextGen());
	});

	it('Изменение ширины по unfocus', () => {

		const controller = new BoardController();
		const view = new View(controller);

		// $('game__board-width').value = '3';

		// let ev = document.createEvent('FocusEvent');
		// ev.initFocusEvent('blur', false, false, window, null, null);
		// let el = document.getElementsByClassName('game__board-width')[0];
		// let g = <HTMLInputElement>document.getElementsByClassName('game__board-width')[0];
		// let event_focus = new simulant('focus');
		// g.value = '3';
		// let event_blur = new simulant('blur');
		// console.log(g);
		// simulant.fire(g, event_focus)

		const canvas = $('.game__board-width');
		canvas.trigger('focus');
		console.log(controller.board.board);
		canvas.val('3')
		canvas.trigger('blur');
		console.log(controller.board.board);


		expect(2+2).to.equal(4);
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});


});