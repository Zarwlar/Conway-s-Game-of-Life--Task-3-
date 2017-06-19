'use strict'
import Board from './Model/Board'
import BoardController from './Controller/BoardController'
import View from './View/View'

export default class App {
  constructor() {
       var controller = new BoardController();
       var view = new View(controller);
  }
}

window.onload = () => {
    var app = new App();
}