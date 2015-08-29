'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }])
  .controller('AddExpenseCtrl', ['$scope', 'categoryList', 'expService', function($scope, categoryList, expService) {
  		$scope.categories = categoryList;

  		$scope.submit = function _submit() {
  			expService.saveExpense($scope.expense);
  		}
  }])
  .controller('ViewSummaryCtrl', ['$scope', 'categoryList', 'expService', function($scope, categoryList, expService) {
  		$scope.expenses = expService.getExpense();

  		$scope.summaryData = [];
  		var categories = categoryList;

  		_.forEach(categories, function(category) {
  			var total = expService.getCategoryTotal(category);
  			$scope.summaryData.push({
  				category: category,
  				amount: total
  			});
  		});
  }]);
