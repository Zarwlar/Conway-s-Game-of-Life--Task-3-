'use strict'

import Board from '../Model/Board'
import View from '../View/View'

export default class BoardController {

	public board: Board;
	public view: View;

	constructor() {
		this.board = new Board();
		this.view = new View(this);

	}

	public pause = () => {
		this.board.play = false;
		this.view.$pauseBtn.setAttribute('disabled','disabled');
		this.view.$playBtn.removeAttribute('disabled');

		return this;

	}

	public changeWidth = (event) => {
		if (this.board.rows === event.currentTarget.value || event.currentTarget.value < 4 || isNaN(event.currentTarget.value)) {
			return;
		}
		this.board.rows = ~~event.currentTarget.value;
	  this.board.changeSize(this.board.cols, this.board.rows);
		this.view.draw();

	}

	public changeHeight = (event) => {
		if (this.board.cols === event.currentTarget.value || event.currentTarget.value < 4 || isNaN(event.currentTarget.value)) {
			return;
		}
		this.board.cols = ~~event.currentTarget.value;
		this.board.changeSize(this.board.cols, this.board.rows);
		this.view.draw();

	}

	public clear = () => {
		this.board.clear();
		if (!this.board.play) {
			this.view.draw();
		} 
		return this;
	}

	public animation = () => {

		var __this = this;
		(function animationLoop() {
			if (!__this.board.play) {
				return;
			}
			__this.board.checkBoard();
			__this.view.draw();
			window.setTimeout(animationLoop, 400);
		})();

		return this;
	}

	public play = () => {

		if (this.board.play) return false;
		this.board.play = true;
		this.animation();
		this.view.$playBtn.setAttribute('disabled', 'disabled');
		this.view.$pauseBtn.removeAttribute('disabled');
		return this;
	}

	public clickHandler = (event) => {

		var event = event || window.event,
			x = (event.offsetY / this.view.itemHeight) | 0,
			y = (event.offsetX / this.view.itemWidth) | 0;
		this.board.toggleState(x, y);
		if (!this.board.play) {
			this.view.draw();
		}
		return [x, y];
	}
}