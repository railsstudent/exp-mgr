'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-expense', {templateUrl: 'partials/add-expense.html', controller: 'AddExpenseCtrl'});
  $routeProvider.when('/view-summary', {templateUrl: 'partials/view-summary.html', controller: 'ViewSummaryCtrl'});
  $routeProvider.otherwise({redirectTo: '/view-summary'});
}]);
