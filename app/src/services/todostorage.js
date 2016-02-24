import { Service as Servc } from "ng-harmony/ng-harmony";

export class TodoStorageService extends Servc {
    static get STORAGE_ID () {
        return "todos-angularjs";
    }
    constructor (...args) {
        super(...args);
        this.todos = [];
    }
}