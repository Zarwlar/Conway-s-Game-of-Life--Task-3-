'use strict'
// import Model from '../Model/model'
// import Controller from '../Controller/controller'
import * as $ from 'jquery'

export default class View {

	private board: HTMLCanvasElement;
	private pauseBtn: HTMLButtonElement;
	private playBtn: HTMLButtonElement;
	private clearBtn: HTMLButtonElement;
	private heightInput: HTMLInputElement;
	private widthInput: HTMLInputElement;
	private ctx: any;
	private height: number;
	private width: number;
	private rows: number;
	private cols: number;
	private itemHeight: number;
	private itemWidth: number;

	addEvent: Function = (elem: HTMLElement, type: string, handler: EventListener | EventListenerObject) => {
		elem.addEventListener(type, handler, false);
	};


	// constructor(private model: Model, private controller: Controller) {

constructor() {

				this.board = <HTMLCanvasElement>$('.game__board').get(0);
				this.playBtn = <HTMLButtonElement>$('.game__btn_play').get(0);
				this.pauseBtn = <HTMLButtonElement>$('.game__btn_pause').get(0);
				this.clearBtn = <HTMLButtonElement>$('.game__btn_clear').get(0);

				this.width = this.board.offsetWidth;
				this.height = this.board.offsetHeight;

				this.addEvent(this.playBtn, 'click', function() {
					alert('Hello strannik');
				});


				this.itemWidth = this.width / this.rows;
				this.itemHeight = this.height / this.cols;

				if (this.board.getContext) {
					this.ctx = this.board.getContext('2d'),
					this.ctx.fillStyle = 'rgb(0,0,0)';
				}

			};

		}
