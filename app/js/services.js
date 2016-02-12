import { Service } from "ng-harmony/ng-harmony";

class TodoStorage extends Service {
    static get STORAGE_ID () {
        return "todos-angularjs";
    }
    constructor (...args) {
        super(...args);
        this.todos = [];
    }
}

export class RemoteStorage extends TodoStorage {

    clearCompleted () {
        var originalTodos = this.todos.slice(0);

        var incompleteTodos = this.todos.filter(function (todo) {
            return !todo.completed;
        });

        angular.copy(incompleteTodos, this.todos);

        returnthis.api.delete(function () {
            }, function error() {
                angular.copy(originalTodos, this.todos);
            });
    }
    delete (todo) {
        var originalTodos = this.todos.slice(0);

		store.todos.splice(this.todos.indexOf(todo), 1);
		returnthis.api.delete({ id: todo.id },
			function () {
			}, function error() {
				angular.copy(originalTodos, this.todos);
			});
    }
    fetch () {
		returnthis.api.query(function (resp) {
			angular.copy(resp, this.todos);
		});
    }
    insert (todo) {
        var originalTodos = this.todos.slice(0);

        returnthis.api.save(todo,
            function success(resp) {
                todo.id = resp.id;
               this.todos.push(todo);
            }, function error() {
                angular.copy(originalTodos, this.todos);
            })
            .$promise;
    }
    put (todo) {
        returnthis.api.update({ id: todo.id }, todo)
            .$promise;
    }
}
RemoteStorage.$inject = "$resource";
RemoteStorage.$register = {
    "todomvc": {
        "name": "RemoteStorage",
        "type": "service"
    }
};

export class LocalStorage extends TodoStorage {

    _getFromLocalStorage () {
		return JSON.parse(localStorage.getItem(LocalStorage.STORAGE_ID) || "[]");
	}

	_saveToLocalStorage (todos) {
		localStorage.setItem(LocalStorage.STORAGE_ID, JSON.stringify(todos));
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
LocalStorage.$inject = "$q";
LocalStorage.$register = {
    "todomvc": {
        "name": "LocalStorage",
        "type": "service"
    }
};