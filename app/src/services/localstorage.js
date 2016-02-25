import { TodoStorageService } from "./todostorage";
import { Service } from "ng-harmony/ng-harmony-annotate";

@Service({
    module: "todomvc",
    name: "LocalStorage",
    deps: "$q"
})
export default class LocalStorageService extends TodoStorageService {
    constructor (...args) {
        super(...args);
        this.fetch();
    }
    _getFromLocalStorage () {
		return JSON.parse(localStorage.getItem(LocalStorageService.STORAGE_ID) || "[]");
	}
	_saveToLocalStorage (todos) {
		localStorage.setItem(LocalStorageService.STORAGE_ID, JSON.stringify(todos));
	}
    clearCompleted () {
        var deferred = this.$q.defer();

		var incompleteTodos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		angular.copy(incompleteTodos, this.todos);

		this._saveToLocalStorage(this.todos);
		deferred.resolve(this.todos);

		return deferred.promise;
    }
    delete (todo) {
        var deferred = this.$q.defer();

        this.todos.splice(this.todos.indexOf(todo), 1);

        this._saveToLocalStorage(this.todos);
        deferred.resolve(this.todos);

        return deferred.promise;
    }
    fetch () {
        var deferred = this.$q.defer();

        angular.copy(this._getFromLocalStorage(), this.todos);
        deferred.resolve(this.todos);

        return deferred.promise;
    }
    insert (todo) {
        var deferred = this.$q.defer();

        this.todos.push(todo);

        this._saveToLocalStorage(this.todos);
        deferred.resolve(this.todos);

        return deferred.promise;
    }
    put (todo, index) {
        var deferred = this.$q.defer();

        this.todos[index] = todo;

        this._saveToLocalStorage(this.todos);
        deferred.resolve(this.todos);

        return deferred.promise;
    }
}