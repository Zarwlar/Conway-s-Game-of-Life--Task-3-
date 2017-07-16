import * as assert from 'assert';
import { expect } from 'chai';
import * as $ from 'jquery';
import * as sinon from 'sinon';
import BoardController from '../src/Controller/BoardController';
import createHTML from './_createHTML';

describe('Тест BoardController', () => {

    beforeEach(() => {
        createHTML();
    });

    it('Должен вызвать ресайз модели', () => {
        const boardController = new BoardController();
        const boardMethodSpy = sinon.spy(boardController.Board, 'fillResizedBoard');
        const controllerMethodSpy = sinon.spy(boardController, 'changeCellMatrixSize');

        boardController.changeCellMatrixSize('col', 15);

        assert(boardMethodSpy.calledOnce);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

});
