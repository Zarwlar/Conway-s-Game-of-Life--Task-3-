interface IModel {
    displayName: string;
    id: number;
}
export default class Model implements IModel {
    displayName: string;id: number;constructor(model: IModel) {
        this.displayName = model.displayName;
        this.id = model.id;
    }
}
let firstModel = new Model({
    id: 1,
    displayName: 'firstModel'
});