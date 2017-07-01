'use strict'
import Board from '../Model/Board'
import BoardController from '../Controller/BoardController'
import * as $ from 'jquery'

export default class View {

	private controller: BoardController;
	public pauseBtn: HTMLButtonElement;
	public playBtn: HTMLButtonElement;
	public clearBtn: HTMLButtonElement;
	public heightInput: HTMLInputElement;
	public widthInput: HTMLInputElement;
	public ctx: CanvasRenderingContext2D;
	public height: number;
	public width: number;
	public itemHeight: number;
	public itemWidth: number;

	constructor(BoardController: BoardController) {

				this.controller = BoardController;
				this.playBtn = <HTMLButtonElement>$('.game__btn_play').get(0); 
				this.pauseBtn = <HTMLButtonElement>$('.game__btn_pause').get(0); 
				this.clearBtn = <HTMLButtonElement>$('.game__btn_clear').get(0); 
				this.widthInput = <HTMLInputElement>$('.game__board-width').get(0); 
				this.heightInput = <HTMLInputElement>$('.game__board-height').get(0); 


				this.width = BoardController.board.canvasBoard.offsetWidth;
				this.height = BoardController.board.canvasBoard.offsetHeight;

				if (BoardController.board.canvasBoard.getContext) {
					this.ctx = BoardController.board.canvasBoard.getContext('2d'),
					this.ctx.fillStyle = 'rgb(0,0,0)';
				}

				BoardController.view = this;
				this.addEvent(this.playBtn, 'click', BoardController.play);
				this.addEvent(this.pauseBtn, 'click', BoardController.pause);
				this.addEvent(this.clearBtn, 'click', BoardController.clear);
				this.addEvent(BoardController.board.canvasBoard, 'click', BoardController.clickHandler);
				this.addEvent(this.widthInput, 'blur', BoardController.changeWidth);
				this.addEvent(this.heightInput, 'blur', BoardController.changeHeight);
				this.draw();

			}

	private addEvent: Function = (elem: HTMLElement, type: string, handler: EventListener | EventListenerObject) => {
		elem.addEventListener(type, handler, false);
	};

	public draw = () => {
		this.itemWidth = this.width / this.controller.board.rows;
		this.itemHeight = this.height / this.controller.board.cols;
		this.ctx.clearRect(0, 0, this.width, this.height);
		for (var i = 0; i < this.controller.board.cols; i++) {
			for (var j = 0; j < this.controller.board.rows; j++) {
				if (!!(this.controller.board.getCellState(i,j))) {
						this.ctx.fillRect(j * this.itemWidth, i * this.itemHeight, this.itemWidth, this.itemHeight);
					}
				}
		}
			return this;
		}

		}
