'use strict';
import * as $ from 'jquery';

export default class Board {

    public rows: number;
    public cols: number;
    public play: boolean;
    private cellMatrix: number[][] = [];
    private nextGen: number[][] = [];

    constructor() {
        this.cols = 10;
        this.rows = 10;
        this.play = false;
        this.fillBoard();
    }

    get cellmatrix(): number[][] {
        return this.cellMatrix;
    }

    public preset = (preset: number[][]): Board => {
        preset.forEach((rows: number[], i: number) => {
            rows.forEach((cols: number, j: number) => {
                if (this.cellHaveValue(preset, i, j) && this.cellNotUndefined(preset, i , j)) {
                    this.cellmatrix[i][j] = preset[i][j];
                }
        });
    });
        return this;
    }

    public getCellState = (x: number, y: number): number => {
        return this.cellmatrix[x][y];
    }

    public toggleState = (x: number, y: number): number => {
        if (this.cellmatrix[x][y] === 0) {
            this.cellmatrix[x][y] = 1;
        } else {
            this.cellmatrix[x][y] = 0;
        }
        return this.cellmatrix[x][y];
    }

    public getNextGen = (): number[][] => {
        this.cellmatrix.forEach((rows: number[], i: number) => {
            rows.forEach((cols: number, j: number) => {
                this.nextGen[i][j] = this.checkState(i, j);
            });
        });
        return this.nextGen;
    }

    public checkBoard = (): Board => {
        this.getNextGen();
        this.cloneBoard(this.nextGen, this.cellmatrix);
        return this;
    }

    public clear = (): number[][] => {
        this.cellmatrix.forEach((rows: number[], i: number) => {
            rows.forEach((cols: number, j: number) => {
                this.cellmatrix[i][j] = 0;
            });
        });
        return this.cellmatrix;
    }

    public fillResizedBoard = (cols: number, rows: number): number[][] => {
        let oldCellMatrix = this.cellmatrix;
        this.cellMatrix = [];
        for (let i = 0; i < cols; i += 1) {
            this.cellmatrix.push([]);
            this.nextGen.push([]);
            for (let j = 0; j < rows; j += 1) {
                try {
                    this.cellmatrix[i].push(oldCellMatrix[i][j] || 0);
                    this.nextGen[i].push(oldCellMatrix[i][j] || 0);
                } catch (e) {
                    this.cellmatrix[i].push(0);
                    this.nextGen[i].push(0);
                }
            }
        }
        oldCellMatrix = [];
        return this.cellmatrix;
    }

    public fillBoard = (): void => {
        for (let i = 0; i < this.cols; i += 1) {
            this.cellmatrix.push([]);
            this.nextGen.push([]);
            for (let j = 0; j < this.rows; j += 1) {
                this.cellmatrix[i].push(0);
                this.nextGen[i].push(0);
            }
        }
    }

    private setCellState = (x: number, y: number, state: number): Board => {
        if (state !== 0 && state !== 1) {
            state = 0;
        }
        this.cellmatrix[x][y] = state;
        return this;
    }

    private checkState = (x: number, y: number): number => {
        const topRow: number = (y === 0) ? this.rows - 1 : y - 1;
        const bottomRow: number = (y === this.rows - 1) ? 0 : y + 1;
        const leftCol: number = (x === 0) ? this.cols - 1 : x - 1;
        const rightCol: number = (x === this.cols - 1) ? 0 : x + 1;
        let sum: number = 0;
        let state: number = this.cellmatrix[x][y];

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

    private cellHaveValue = (preset: number[][], i: number, j: number): boolean => {
           if ((this.cellmatrix[i][j] === 0 || this.cellmatrix[i][j] === 1)) {
                    return true;
        }
           return false;
    }

    private cellNotUndefined = (preset: number[][], i: number, j: number): boolean => {
        if ((preset[i][j] !== undefined) && (this.cellmatrix[i][j] !== undefined)) {
            return true;
        }
        return false;
    }

    private cloneBoard = (nextGen: number[][], board: number[][]): number[][] => {
        this.cellmatrix.forEach((rows: number[], i: number) => {
            rows.forEach((cols: number, j: number) => {
                board[i][j] = nextGen[i][j];
            });
        });
        return nextGen;
    }

}
