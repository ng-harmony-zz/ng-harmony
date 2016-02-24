import { Controller as Ctrl } from "ng-harmony/ng-harmony";
import { Component, Controller } from "ng-harmony/ng-harmony-annotate";

@Component({
	module: "todomvc",
	selector: "todo-focus",
	restrict: "A",
	scope: {}
})
@Controller({
	module: "todomvc",
	name: "Focus",
	deps: ["$element", "$timeout"]
})
class FocusController extends Ctrl {
	constructor(...args) {
		super(...args);
		this.$scope.$watch(this.$attrs, function (newVal) {
			if (newVal) {
				this.$timeout(function () {
					this.$element[0].focus();
				}, 0, false);
			}
		});
	}
}