import { Controller as Ctrl } from "ng-harmony/ng-harmony";
import { Controller } from "ng-harmony/ng-harmony-annotate";

@Controller({
	module: "todomvc",
	name: "Todo",
	deps: ["$filter", "$http", "TodoStorage"]
})
export default class TodoController extends Ctrl {
    constructor (...args) {
        super(...args);

        this.$scope.todos = this.TodoStorage.todos;
        this.todos = this.TodoStorage.todos;
        this.$scope.newTodo = "";
        this.$scope.editedTodo = null;

        this.$scope.$watch("todos", () => {
            this.$scope.remainingCount = this.$filter("filter")(this.todos, { completed: false }).length;
            this.$scope.completedCount = this.todos.length - this.$scope.remainingCount;
            this.$scope.allChecked = !this.$scope.remainingCount;
        }, true);

        // Monitor the current route for changes and adjust the filter accordingly.
        this.$scope.$on("$routeChangeSuccess", () => {
            let status = this.$scope.status = this.$routeParams.status || "";
            this.$scope.statusFilter = (status === "active") ?
            { completed: false } : (status === "completed") ?
            { completed: true } : {};
        });
    }

	addTodo () {
        console.log("happy day sire");
		let newTodo = {
			title: this.$scope.newTodo.trim(),
			completed: false
		};
        console.log(newTodo);
		if (!newTodo.title) {
			return;
		}

		this.$scope.saving = true;
		this.TodoStorage.insert(newTodo)
			.then(() => {
				this.$scope.newTodo = "";
			})
			.finally(() => {
				this.$scope.saving = false;
			});
	}

	$editTodo (todo) {
		this.$scope.editedTodo = todo;

		// Clone the original todo to restore it on demand.
		this.$scope.originalTodo = angular.extend({}, todo);
	}

    $saveEdits (todo, event) {

		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.
		if (event === "blur" && this.$scope.saveEvent === "submit") {
			this.$scope.saveEvent = null;
			return;
		}

		this.$scope.saveEvent = event;

		if (this.$scope.reverted) {
			// Todo edits were reverted-- don't save.
			this.$scope.reverted = null;
			return;
		}

		todo.title = todo.title.trim();

		if (todo.title === this.$scope.originalTodo.title) {
			this.$scope.editedTodo = null;
			return;
		}

		this.TodoStorage[todo.title ? "put" : "delete"](todo)
			.then(() => {}, () => {
				todo.title = this.$scope.originalTodo.title;
			})
			.finally(() => {
				this.$scope.editedTodo = null;
			});
	}

	$revertEdits (todo) {
		this.todos[this.todos.indexOf(todo)] = this.$scope.originalTodo;
		this.$scope.editedTodo = null;
		this.$scope.originalTodo = null;
		this.$scope.reverted = true;
	}

	$removeTodo (todo) {
		this.TodoStorage.delete(todo);
	}

	$saveTodo (todo) {
		this.TodoStorage.put(todo);
	}

	$toggleCompleted (todo, completed) {
		if (angular.isDefined(completed)) {
			todo.completed = completed;
		}
		this.TodoStorage
            .put(todo, this.todos.indexOf(todo))
			.then(function success() {}, function error() {
				todo.completed = !todo.completed;
			});
	}

	$clearCompletedTodos () {
		this.TodoStorage.clearCompleted();
	}

	$markAll (completed) {
		this.todos.forEach((todo) => {
			if (todo.completed !== completed) {
				this.$scope.toggleCompleted(todo, completed);
			}
		});
	}
}