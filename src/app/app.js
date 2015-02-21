
angular.module('ngHarmony', [
  'ngRoute',
  'ngHarmony.todo'
])
.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/todo', {
      controller: 'TodoCtrl',
      templateUrl: '/ng-harmony/todo/todo.html'
    })
    .otherwise({
      redirectTo: '/todo'
    });
});
