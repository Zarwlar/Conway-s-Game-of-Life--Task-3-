  import Model from '../Model/model'
  import View from '../View/view'
  import $ from 'jquery'

  class Controller {
      model: Model;
      view: View;
      constructor() {
          this.model = new Model({ 
              id: 1,
              displayName: 'firstModel'
          });
           this.view = new View($('#viewTemplate').html());
      }
      render() {
          $('#domElement').html(this.view.render(this.model));
      }
  }