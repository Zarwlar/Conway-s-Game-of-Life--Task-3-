'use strict';
import BoardController from './Controller/BoardController';
import View from './View/View';

export default class App {
  constructor() {
       const controller: BoardController = new BoardController();
  }
}

window.onload = (): void => {
    const app: App = new App();
};
