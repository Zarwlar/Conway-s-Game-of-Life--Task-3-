'use strict';
import * as $ from 'jquery';
import Board from '../Model/Board';

export default class View {

    public $pauseBtn: HTMLButtonElement;
    public $playBtn: HTMLButtonElement;
    public $clearBtn: HTMLButtonElement;
    public $heightInput: HTMLInputElement;
    public $widthInput: HTMLInputElement;
    public ctx: CanvasRenderingContext2D;
    public height: number;
    public width: number;
    public itemHeight: number;
    public itemWidth: number;

    constructor() {
        this.$playBtn = $('.js-game__button-play').get(0) as HTMLButtonElement;
        this.$pauseBtn = $('.js-game__button-pause').get(0) as HTMLButtonElement;
        this.$clearBtn = $('.js-game__button-clear').get(0) as HTMLButtonElement;
        this.$widthInput = $('.js-game__input-width').get(0) as HTMLInputElement;
        this.$heightInput = $('.js-game__input-height').get(0) as HTMLInputElement;
    }

    public draw = (board: Board): View => {
        this.itemWidth = this.width / board.rows;
        this.itemHeight = this.height / board.cols;
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < board.cols; i++) {
             for (let j = 0; j < board.rows; j++) {
                 if (!!(board.getCellState(i, j))) {
                        this.ctx.fillRect(j * this.itemWidth, i * this.itemHeight, this.itemWidth, this.itemHeight);
                    }
                }
            }
        return this;
        }

    public addEvent = (elem: HTMLElement, type: string, handler: EventListener | EventListenerObject): void => {
        elem.addEventListener(type, handler, false);
    }
}
