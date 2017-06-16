'use strict'
import Board from './Model/Board'
import BoardController from './Controller/BoardController'
import View from './View/View'

export default class App {
  constructor() {
       var board = new Board();
       var controller = new BoardController(board);
       var view = new View(controller);
  }
}

window.onload = () => {
    var app = new App();
}