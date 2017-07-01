'use strict'
import * as $ from 'jquery'

export default class Board {

	private _cellmatrix: Array < Array < number >> = [];
	private nextGen: Array < any > = [];
	public rows: number;
	public cols: number;
	public play: boolean;
	public $canvasBoard;

	constructor() {

		this.cols = 10;
		this.rows = 10;
		this.play = false;
		this.$canvasBoard = < HTMLCanvasElement > $('.game__board').get(0);

		document.getElementsByClassName
		this.fillBoard(this.cols, this.rows);
	}

	get cellmatrix() {
		return this._cellmatrix;
	}


	public preset = (preset: Array < Array < number >> ) => {
		for (var i = 0, c = preset.length; i < c; i += 1) {
			for (var j = 0, r = preset[i].length; j < r; j += 1) {
				if ((preset[i][j] != undefined) && (this.cellmatrix[i][j] != undefined) && (this.cellmatrix[i][j] === 0 || this.cellmatrix[i][j] === 1)) {
					this.cellmatrix[i][j] = preset[i][j];
				}
			}
		}

		return this;
	};
	private setCellState = (x: number, y: number, state: number) => {
		if (state !== 0 && state !== 1) {
			state = 0;
		}
		this.cellmatrix[x][y] = state;
		return this;
	}

	public getCellState = (x: number, y: number) => {
		return this.cellmatrix[x][y];
	}

	public toggleState = (x: number, y: number) => {
		if (this.cellmatrix[x][y] === 0) {
			this.cellmatrix[x][y] = 1;
		} else {
			this.cellmatrix[x][y] = 0;
		}
		return this.cellmatrix[x][y];
	}

	private checkState = (x: number, y: number) => {
		var topRow = (y === 0) ? this.rows - 1 : y - 1,
			bottomRow = (y === this.rows - 1) ? 0 : y + 1,
			leftCol = (x === 0) ? this.cols - 1 : x - 1,
			rightCol = (x === this.cols - 1) ? 0 : x + 1,
			sum = 0,
			state = this.cellmatrix[x][y];

		sum = this.cellmatrix[leftCol][topRow] + this.cellmatrix[x][topRow] + this.cellmatrix[rightCol][topRow] +
			this.cellmatrix[leftCol][y] + this.cellmatrix[rightCol][y] +
			this.cellmatrix[leftCol][bottomRow] + this.cellmatrix[x][bottomRow] + this.cellmatrix[rightCol][bottomRow];

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
		this.cloneBoard(this.nextGen, this.cellmatrix);

		return this;
	}

	public clear = () => {
		for (var i = 0; i < this.cols; i += 1) {
			for (var j = 0; j < this.rows; j += 1) {
				this.cellmatrix[i][j] = 0;
			}
		}
		return this.cellmatrix;
	}

	public changeSize = (cols, rows) => {
		let tmp = this.cellmatrix;
		this._cellmatrix = [];
		for (var i = 0; i < cols; i += 1) {
			this.cellmatrix.push([]);
			this.nextGen.push([]);
			for (var j = 0; j < rows; j += 1) {
				try {
					this.cellmatrix[i].push(tmp[i][j] || 0);
					this.nextGen[i].push(tmp[i][j] || 0);
				} catch (e) {
					console.log(`${e.namee}: ${e.message}`);
				}
			}
		}
		tmp = [];
		return this.cellmatrix;
	}

	public fillBoard = (cols, rows) => {
		for (var i = 0; i < cols; i += 1) {
			this.cellmatrix.push([]);
			this.nextGen.push([]);
			for (var j = 0; j < rows; j += 1) {
				this.cellmatrix[i].push(0);
				this.nextGen[i].push(0);
			}
		}
	}


}