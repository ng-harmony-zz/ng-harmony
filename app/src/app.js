import module from "./module";
import routes from "./routes";

import "./services/localstorage";
import "./services/remotestorage";

import "./components/escape";
import "./components/focus";

import "./controllers/todo";

module.module.run(function($rootScope) {
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
		console.log("hello error");
		console.log(error); 
		console.log(arguments);
	});
});

module.routing(routes);
module.bootstrap();