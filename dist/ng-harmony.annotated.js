angular.module('ngHarmony.todo', []);

angular
  .module('ngHarmony.todo')
  .controller('TodoCtrl', ["$scope", "$window", function ($scope, $window) {
    'use strict';
    $scope.todos = JSON.parse($window.localStorage.getItem('todos') || '[]');
    $scope.$watch('todos', function (newTodos, oldTodos) {
      if (newTodos !== oldTodos) {
        $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
      }
    }, true);

    $scope.add = function () {
      var todo = {label: $scope.label, isDone: false};
      $scope.todos.push(todo);
      $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
      $scope.label = '';
    };

    $scope.check = function () {
      this.todo.isDone = !this.todo.isDone;
    };
  }]);


angular.module('ngHarmony', [
  'ngRoute',
  'ngHarmony.todo'
])
.config(["$routeProvider", function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/todo', {
      controller: 'TodoCtrl',
      templateUrl: '/ng-harmony/todo/todo.html'
    })
    .otherwise({
      redirectTo: '/todo'
    });
}]);

(function(module) {
try {
  module = angular.module('ng-harmony');
} catch (e) {
  module = angular.module('ng-harmony', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/ng-harmony/todo/todo.html',
    '<h3>Todo</h3><ul class="todo-list"><li class="todo-item" ng-repeat="todo in todos" ng-class="{\'todo-done\': todo.isDone}"><label><input type="checkbox" ng-click="check()" ng-model="todo.isDone">&nbsp;{{todo.label}}</label></li><li class="todo-item"><form ng-submit="add()"><input placeholder="New item..." ng-model="label"> <button type="submit" ng-disabled="posting || !label">Add</button></form></li></ul>');
}]);
})();
