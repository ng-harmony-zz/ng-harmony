import { Controller as Ctrl } from "ng-harmony/ng-harmony";
import { Component, Controller } from "ng-harmony/ng-harmony-annotate";

@Component({
	module: "todomvc",
	selector: "todo-escape",
	restrict: "A",
	scope: {}
})
@Controller({
	module: "todomvc",
	name: "Escape",
	deps: ["$element", "$attrs"]
})
class EscapeController extends Ctrl {
	constructor(...args) {
		super(...args);
		this.ESCAPE_KEY = 27;
		this.$element.bind('keydown', function (event) {
			if (event.keyCode === this.ESCAPE_KEY) {
				this.$scope.$apply(this.$attrs.todoEscape);
			}
		});
		this.$scope.$on('$destroy', function () {
			this.$element.unbind('keydown');
		});
	}
}