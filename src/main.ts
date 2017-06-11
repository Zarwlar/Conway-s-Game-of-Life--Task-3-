'use strict'
import Board from './Model/Board'
import BoardController from './Controller/BoardController'
import View from './View/View'

export default class App {
  constructor() {
       var board = new Board({rows: 10, cols: 10});
       var controller = new BoardController(board);
       var view = new View(board, controller);
  }
}

window.onload = () => {
    var app = new App();
}