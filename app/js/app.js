'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', ['app.filters', 'app.services', 'app.directives','ui.bootstrap','ui.bootstrap-apium']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/registration'});
  }]);
