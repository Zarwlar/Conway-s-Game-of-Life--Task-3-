'use strict';
import * as $ from 'jquery';

export default class View {

    public $pauseBtn: HTMLButtonElement;
    public $playBtn: HTMLButtonElement;
    public $clearBtn: HTMLButtonElement;
    public $heightInput: HTMLInputElement;
    public $widthInput: HTMLInputElement;
    public $canvasBoard: HTMLCanvasElement;
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
        this.$canvasBoard = $('.js-game__board').get(0) as HTMLCanvasElement;
    }

    public draw = (cellmatrix: number[][]): View => {
        this.itemWidth = this.width / cellmatrix[0].length;
        this.itemHeight = this.height / cellmatrix.length;
        this.ctx.clearRect(0, 0, this.width, this.height);
        cellmatrix.forEach((rows: number[], i: number) => {
            rows.forEach((cols: number, j: number) => {
                if (!!cellmatrix[i][j]) {
                    this.ctx.fillRect(j * this.itemWidth, i * this.itemHeight, this.itemWidth, this.itemHeight);
                }
            });
         });
        return this;
        }

    public addEvent = (elem: HTMLElement, type: string, handler: EventListener | EventListenerObject): void => {
        elem.addEventListener(type, handler, false);
    }
}
