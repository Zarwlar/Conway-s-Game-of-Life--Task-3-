'use strict'
import * as $ from 'jquery'

export default class Board {

	private _board: Array < Array < number >> = [];
	private nextGen: Array < any > = [];
	public rows: number;
	public cols: number;
	public play: boolean;
	public canvasBoard;

	constructor(conf ? : any) {
		conf = conf || {};
		this.cols = conf.cols || 10;
		this.rows = conf.rows || 10;

		this.play = false;
		this.canvasBoard = < HTMLCanvasElement > $('.game__board').get(0);
		document.getElementsByClassName
		this.fillBoard(this.cols, this.rows);
	}

	get board() {
		return this._board;
	}


	public preset = (preset: Array < Array < number >> ) => {
		for (var i = 0, c = preset.length; i < c; i += 1) {
			for (var j = 0, r = preset[i].length; j < r; j += 1) {
				if ((preset[i][j] != undefined) && (this.board[i][j] != undefined) && (this.board[i][j] === 0 || this.board[i][j] === 1)) {
					this.board[i][j] = preset[i][j];
				}
			}
		}

		return this;
	};
	private setCellState = (x: number, y: number, state: number) => {
		if (state !== 0 && state !== 1) {
			state = 0;
		}
		this.board[x][y] = state;
		return this;
	}

	public getCellState = (x: number, y: number) => {
		return this.board[x][y];
	}

	public toggleState = (x: number, y: number) => {
		if (this.board[x][y] === 0) {
			this.board[x][y] = 1;
		} else {
			this.board[x][y] = 0;
		}
		return this.board[x][y];
	}

	private checkState = (x: number, y: number) => {
		var topRow = (y === 0) ? this.rows - 1 : y - 1,
			bottomRow = (y === this.rows - 1) ? 0 : y + 1,
			leftCol = (x === 0) ? this.cols - 1 : x - 1,
			rightCol = (x === this.cols - 1) ? 0 : x + 1,
			sum = 0,
			state = this.board[x][y];

		sum = this.board[leftCol][topRow] + this.board[x][topRow] + this.board[rightCol][topRow] +
			this.board[leftCol][y] + this.board[rightCol][y] +
			this.board[leftCol][bottomRow] + this.board[x][bottomRow] + this.board[rightCol][bottomRow];

		if (state === 0 && sum === 3) {
			state = 1;
		} else if (state === 1 && (sum < 2 || sum > 3)) {
			state = 0;
		}
		return state;
	}


	private cloneBoard = (nextGen, board) => {
		for (var i = 0; i < this.cols; i += 1) {
			for (var j = 0; j < this.rows; j += 1) {
				board[i][j] = nextGen[i][j];
			}
		}
		return nextGen;
	}

	public getNextGen = () => {
		for (var i = 0; i < this.cols; i += 1) {
			for (var j = 0; j < this.rows; j += 1) {
				this.nextGen[i][j] = this.checkState(i, j);
			}
		}
		return this.nextGen;
	}

	public checkBoard = () => {
		this.getNextGen();
		this.cloneBoard(this.nextGen, this.board);

		return this;
	}

	public clear = () => {
		for (var i = 0; i < this.cols; i += 1) {
			for (var j = 0; j < this.rows; j += 1) {
				this.board[i][j] = 0;
			}
		}
		return this.board;
	}

	public fillBoard = (cols, rows) => {
		console.log(this.board, 'Перед заполнением');
		for (var i = 0; i < cols; i += 1) {
			if (this.board.length > cols) {
				this.board.push([]);
				this.nextGen.push([]);
			} else {
				this.board.shift();
				this.nextGen.shift();
			}
			for (var j = 0; j < rows; j += 1) {
					this.board[i].push(0);
					this.nextGen[i].push(0);
			}
		}
	}


}