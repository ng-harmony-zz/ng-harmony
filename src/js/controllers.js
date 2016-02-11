/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
import { Controller } from "ng-harmony/ng-harmony";

export class TodoCtrl extends Controller {
        constructor (...args) {
            super(...args);

            console.log("Hello!!!");

            this.$scope.todos = this.store.todos;
            this.todos = this.store.todos;
            this.$scope.newTodo = "";
            this.$scope.editedTodo = null;

            $scope.$watch("todos", () => {
                this.$scope.remainingCount = this.$filter("filter")(todos, { completed: false }).length;
                this.$scope.completedCount = todos.length - this.$scope.remainingCount;
                this.$scope.allChecked = !$scope.remainingCount;
            }, true);

            // Monitor the current route for changes and adjust the filter accordingly.
            $scope.$on("$routeChangeSuccess", () => {
                let status = this.$scope.status = this.$routeParams.status || "";
                this.$scope.statusFilter = (status === "active") ?
                { completed: false } : (status === "completed") ?
                { completed: true } : {};
            });
        }

		addTodo () {
			let newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};

			if (!newTodo.title) {
				return;
			}

			this.$scope.saving = true;
			this.store.insert(newTodo)
				.then(() => {
					this.$scope.newTodo = "";
				})
				.finally(() => {
					this.$scope.saving = false;
				});
		}

		editTodo (todo) {
			this.$scope.editedTodo = todo;

			// Clone the original todo to restore it on demand.
			this.$scope.originalTodo = angular.extend({}, todo);
		}

        saveEdits (todo, event) {

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

			this.store[todo.title ? "put" : "delete"](todo)
				.then(() => {}, () => {
					todo.title = this.$scope.originalTodo.title;
				})
				.finally(() => {
					this.$scope.editedTodo = null;
				});
		}

		revertEdits (todo) {
			this.todos[this.todos.indexOf(todo)] = this.$scope.originalTodo;
			this.$scope.editedTodo = null;
			this.$scope.originalTodo = null;
			this.$scope.reverted = true;
		}

		removeTodo (todo) {
			this.store.delete(todo);
		}

		saveTodo (todo) {
			this.store.put(todo);
		}

		toggleCompleted (todo, completed) {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			this.store
                .put(todo, this.todos.indexOf(todo))
				.then(function success() {}, function error() {
					todo.completed = !todo.completed;
				});
		}

		clearCompletedTodos () {
			store.clearCompleted();
		}

		markAll (completed) {
			this.todos.forEach((todo) => {
				if (todo.completed !== completed) {
					this.$scope.toggleCompleted(todo, completed);
				}
			});
		}
	}
    TodoCtrl.$inject = ["$routeParams", "$filter", "store"];
    TodoCtrl.$register = {
        "todomvc": {
            name: "TodoCtrl"
        }
    };
