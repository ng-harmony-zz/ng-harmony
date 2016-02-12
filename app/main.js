import module from "./js/module";
import routeConfig from "./js/routes";

import "./js/directives";
import { TodoStorage } from "./js/services";
import { TodoCtrl } from "./js/controllers";

module.config(function ($routeProvider) {
    $routeProvider
        .when("/", routeConfig)
        .when("/:status", routeConfig)
        .otherwise({
            redirectTo: "/"
        });
});

angular.element(document).ready(function () {
    console.log("hallo");
    angular.bootstrap(document, ["todomvc"]);
    console.log("angular");
});
