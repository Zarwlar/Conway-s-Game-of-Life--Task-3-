import { expect } from 'chai';
import * as $ from 'jquery';
import BoardController from '../src/Controller/BoardController';
import createHTML from './_createHTML';

describe('Тест View', () => {

    beforeEach(() => {
        createHTML();
    });

    it('Обработка клика по клетке', () => {

        const controller: BoardController = new BoardController();
        const canvas: any = document.getElementsByClassName('js-game__board')[0];

        function click(el: any): void {
            const ev: MouseEvent = document.createEvent('MouseEvent');
            ev.initMouseEvent(
                'click',
                true, true,
                window, null,
                25, 133, 27, 135,
                false, false, false, false,
                0, null,
            );
            el.dispatchEvent(ev);
        }

        click(canvas);

        expect([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]).to.deep.equal(controller.Board.cellmatrix);
    });

    it('Изменение ширины по unfocus', () => {

        const controller: BoardController = new BoardController();

        const inputWidth: $ = $('.js-game__input-width');
        inputWidth.trigger('focus');
        inputWidth.val('5');
        inputWidth.trigger('blur');

        expect([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]).to.deep.equal(controller.Board.cellmatrix);
    });

    it('Изменение высоты по unfocus', () => {

        const controller: BoardController = new BoardController();

        const inputHeight: $ = $('.js-game__input-height');
        inputHeight.trigger('focus');
        inputHeight.val('5');
        inputHeight.trigger('blur');

        expect([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]).to.deep.equal(controller.Board.cellmatrix);
    });

    it('Получение не числа в инпуты ширины/высоты', () => {

        const controller: BoardController = new BoardController();

        const inputHeight: $ = $('.js-game__input-height');
        inputHeight.trigger('focus');
        inputHeight.val('f');
        inputHeight.trigger('blur');

        expect(10).to.equal(controller.Board.rows);
        expect(10).to.equal(controller.Board.cols);
    });

    it('Блокировка клавиши Play после нажатия', () => {

        const controller: BoardController = new BoardController();

        const buttonPlay: $ = $('.js-game__button-play');
        buttonPlay.trigger('click');
        expect('disabled').to.equal(buttonPlay.attr('disabled'));
    });

    it('Блокировка клавиши Pause после нажатия', () => {

        const controller: BoardController = new BoardController();

        const buttonPause: $ = $('.js-game__button-pause');
        buttonPause.trigger('click');
        expect('disabled').to.equal(buttonPause.attr('disabled'));
    });

    it('Разблокировка Play после нажатия на Pause', () => {

        const controller: BoardController = new BoardController();

        const buttonPlay: $ = $('.js-game__button-play');
        const buttonPause: $ = $('.js-game__button-pause');
        buttonPlay.trigger('click');
        expect('disabled').to.equal(buttonPlay.attr('disabled'));
        buttonPause.trigger('click');
        expect(undefined).to.equal(buttonPlay.attr('disabled'));
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

});