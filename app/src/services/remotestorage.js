import { TodoStorageService } from "./todostorage";
import { Service } from "ng-harmony/ng-harmony-annotate";

@Service({
    module: "todomvc",
    name: "RemoteStorage"
})
export default class RemoteStorageService extends TodoStorageService {
    clearCompleted () {
        var originalTodos = this.todos.slice(0);

        var incompleteTodos = this.todos.filter(function (todo) {
            return !todo.completed;
        });

        angular.copy(incompleteTodos, this.todos);

        return this.api.delete(function () {
            }, function error() {
                angular.copy(originalTodos, this.todos);
            });
    }
    delete (todo) {
        var originalTodos = this.todos.slice(0);

		store.todos.splice(this.todos.indexOf(todo), 1);
		return this.api.delete({ id: todo.id },
			function () {
			}, function error() {
				angular.copy(originalTodos, this.todos);
			});
    }
    fetch () {
		return this.api.query(function (resp) {
			angular.copy(resp, this.todos);
		});
    }
    insert (todo) {
        var originalTodos = this.todos.slice(0);

        return this.api.save(todo,
            function success(resp) {
                todo.id = resp.id;
               this.todos.push(todo);
            }, function error() {
                angular.copy(originalTodos, this.todos);
            })
            .$promise;
    }
    put (todo) {
        return this.api.update({ id: todo.id }, todo)
            .$promise;
    }
}
