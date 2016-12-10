'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', ['app.controllers', 'app.filters', 'app.services', 'app.directives','ui.bootstrap','ui.bootstrap-apium']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/course/:courseId', {
      templateUrl: 'partials/traintron.html',
      controller: 'trainTron'
    });
    $routeProvider.when('/registration', {
      templateUrl: 'partials/registration.html',
    });
    $routeProvider.otherwise({redirectTo: '/registration'});
  }]);
