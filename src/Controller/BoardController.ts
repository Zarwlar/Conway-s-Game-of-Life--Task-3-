'use strict';

import Board from '../Model/Board';
import View from '../View/View';

export default class BoardController {

    public Board: Board;
    public View: View;

    constructor() {
        this.Board = new Board();
        this.View = new View();
        this.View.width = this.View.$canvasBoard.offsetWidth;
        this.View.height = this.View.$canvasBoard.offsetHeight;
        this.View.ctx = this.View.$canvasBoard.getContext('2d');
        this.View.ctx.fillStyle = 'rgb(0,0,0)';
        this.View.addEvent(this.View.$playBtn, 'click', this.play);
        this.View.addEvent(this.View.$pauseBtn, 'click', this.pause);
        this.View.addEvent(this.View.$clearBtn, 'click', this.clear);
        this.View.addEvent(this.View.$canvasBoard, 'click', this.clickHandler);
        this.View.addEvent(this.View.$widthInput, 'blur', this.resizeWidth);
        this.View.addEvent(this.View.$heightInput, 'blur', this.resizeHeight);
        this.View.draw(this.Board.cellmatrix);
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

    public pause = (): BoardController => {
        this.Board.play = false;
        this.View.$pauseBtn.setAttribute('disabled', 'disabled');
        this.View.$playBtn.removeAttribute('disabled');
        return this;
    }

    public resizeWidth = (event: Event): void => {
        const value: number = Number((event.currentTarget as HTMLInputElement).value);
        if (this.validateInputSize('rows', value)) {
            this.changeCellMatrixSize('rows', value);
        }
    }

    public resizeHeight= (event: Event): void => {
        const value: number  = Number((event.currentTarget as HTMLInputElement).value);
        if (this.validateInputSize('cols', value)) {
            this.changeCellMatrixSize('cols', value);
        }
    }

    public clear = (): BoardController => {
        this.Board.clear();
        if (!this.Board.play) {
            this.View.draw(this.Board.cellmatrix);
        }
        return this;
    }

    public clickHandler = (event: any): number[] => {
        const receivedEvent: any = event || window.event;
        const x: number  = (receivedEvent.offsetY / this.View.itemHeight);
        const y: number  = (receivedEvent.offsetX / this.View.itemWidth);
        this.Board.toggleState(Math.floor(x), Math.floor(y));
        if (!this.Board.play) {
            this.View.draw(this.Board.cellmatrix);
        }
        return [x, y];
    }

    private animation = (): BoardController => {

        (function animationLoop(): void {
            if (!this.Board.play) {
                return;
            }
            this.Board.checkBoard();
            this.View.draw(this.Board.cellmatrix);
            window.setTimeout(animationLoop.bind(this), 400);
        }).bind(this)();

        return this;
    }

    private validateInputSize(position: string, value: number): boolean {
        if (this.Board[position] === value || value < 4 || isNaN(value)) {
            return false;
        }
        return true;
    }

    private changeCellMatrixSize(position: string, value: number): void {
        this.Board[position] = Math.ceil(value);
        this.Board.fillResizedBoard(this.Board.cols, this.Board.rows);
        this.View.draw(this.Board.cellmatrix);
    }

}
