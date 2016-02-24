import angular from "angular";

import module from "./module";
import routes from "./routes";

import "./components/escape";
import "./components/focus";
import "./services/localstorage";
import "./services/remotestorage";
import "./controllers/todo";

/*module.config(($locationProvider) => {
	$locationProvider.html5Mode(true).hashPrefix("!");
});*/

module.module.run(function($rootScope) {
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
		console.log("hello error");
		console.log(error); 
		console.log(arguments);
	});
});

module.routing(routes);
//module.bootstrap();
angular.element(document).ready(() => {
	setTimeout(() => { 
		angular.bootstrap(document, ["todomvc"]);
	}, 1000);
})