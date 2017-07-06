'use strict';

import Board from '../Model/Board';
import View from '../View/View';

export default class BoardController {

    public Board: Board;
    public View: View;

    constructor() {
        this.Board = new Board();
        this.View = new View();
        this.View.width = this.Board.$canvasBoard.offsetWidth;
        this.View.height = this.Board.$canvasBoard.offsetHeight;
        this.View.ctx = this.Board.$canvasBoard.getContext('2d');
        this.View.ctx.fillStyle = 'rgb(0,0,0)';
        this.View.addEvent(this.View.$playBtn, 'click', this.play);
        this.View.addEvent(this.View.$pauseBtn, 'click', this.pause);
        this.View.addEvent(this.View.$clearBtn, 'click', this.clear);
        this.View.addEvent(this.Board.$canvasBoard, 'click', this.clickHandler);
        this.View.addEvent(this.View.$widthInput, 'blur', this.changeRows);
        this.View.addEvent(this.View.$heightInput, 'blur', this.changeCols);
        this.View.draw(this.Board);
}

    public pause = (): BoardController => {
        this.Board.play = false;
        this.View.$pauseBtn.setAttribute('disabled', 'disabled');
        this.View.$playBtn.removeAttribute('disabled');
        return this;
    }

    public changeRows = (event: Event): void => {
        const value: number = Number((event.currentTarget as HTMLInputElement).value);
        if (this.validateInputSize('rows', value)) {
            this.changeCellMatrixSize('rows', value);
        }
    }

    public changeCols= (event: Event): void => {
        const value: number  = Number((event.currentTarget as HTMLInputElement).value);
        if (this.validateInputSize('cols', value)) {
            this.changeCellMatrixSize('cols', value);
        }
    }

    public clear = (): BoardController => {
        this.Board.clear();
        if (!this.Board.play) {
            this.View.draw(this.Board);
        }
        return this;
    }

    public animation = (): BoardController => {

        (function animationLoop(): void {
            if (!this.Board.play) {
                return;
            }
            this.Board.checkBoard();
            this.View.draw(this.Board);
            window.setTimeout(animationLoop.bind(this), 400);
        }).bind(this)();

        return this;
    }

    public play = (): any => {
        if (this.Board.play) {
            return false;
        }
        this.Board.play = true;
        this.animation();
        this.View.$playBtn.setAttribute('disabled', 'disabled');
        this.View.$pauseBtn.removeAttribute('disabled');
        return this;
    }

    public clickHandler = (event: any): number[] => {
        const receivedEvent: any = event || window.event;
        const x: number  = (receivedEvent.offsetY / this.View.itemHeight);
        const y: number  = (receivedEvent.offsetX / this.View.itemWidth);
        this.Board.toggleState(Math.floor(x), Math.floor(y));
        if (!this.Board.play) {
            this.View.draw(this.Board);
        }
        return [x, y];
    }

    private validateInputSize(position: string, value: number): boolean {
        if (this.Board[position] === value || value < 4 || isNaN(value)) {
            return false;
        }
        return true;
    }

    private changeCellMatrixSize(position: string, value: number): void {
        this.Board[position] = Math.ceil(value);
        this.Board.changeSize(this.Board.cols, this.Board.rows);
        this.View.draw(this.Board);
    }

}
