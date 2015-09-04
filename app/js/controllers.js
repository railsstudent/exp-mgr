'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AddExpenseCtrl', ['$scope', 'categoryList', 'expService', function($scope, categoryList, expService) {
  		$scope.categories = categoryList;

      $scope.message = '';
  		$scope.submit = function _submit() {
        $scope.message = '';
  			var promise = expService.saveExpense($scope.expense);
        promise.then(function(message) {
          $scope.message = message;
        }, 
        function(reason) {
          $scope.message = reason;
        });
  		}
  }])
  .controller('ViewSummaryCtrl', ['$scope', 'categoryList', 'expService', '$timeout', function($scope, categoryList, expService, $timeout) {
  		
      var initExpenses = function _initExpenses() {

        $scope.expenses = expService.getExpense();
        $scope.selections = [];
        for (var i = 0; i < $scope.expenses.length; i++) {
          $scope.selections.push(false);
        }
      };

      var initSummaryData = function _initSummaryData() {
        $scope.summaryData = [];
        var categories = categoryList;

        _.forEach(categories, function(category) {
          var total = expService.getCategoryTotal(category);
          $scope.summaryData.push({
            category: category,
            amount: total
          });
        });
      };

      initExpenses();
      initSummaryData();

      $scope.isChecked = function _isChecked(index) {
        return $scope.selections[index];
      };

      $scope.sync = function _sync(index, bool) {
        $scope.selections[index] = bool;
      };

      $scope.deleteExpense = function _delete() {
        for (var i = 0; i < $scope.selections.length; i++) {
          if ($scope.selections[i] === true) {
            window.localStorage.removeItem($scope.expenses[i].key);
          }
        }
        initExpenses();
        $timeout(initSummaryData());
      };
  }])
  .controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {

    var navigator = function _navigator(incrementer) {
      var pages = ['/add-expense', '/view-summary'];

      var nextUrl = "";
      var currentPage = $location.path();
      var lastPageIndex = pages.length - 1;
      var pageIndex = pages.indexOf(currentPage);
      var direction = pageIndex + incrementer;
      $scope.slidingDirection = (incrementer === 1) ? 'slide-right' : 'slide-left';
      if (direction === -1) { 
        direction = lastPageIndex;
      }
      if (direction > lastPageIndex) { 
        direction = 0;
      } 
      nextUrl = pages[direction];
      $location.url(nextUrl);
    };

    $scope.goLeft = function _goLeft() { 
      navigator(-1); 
    };

    $scope.goRight = function _goRight() { 
      navigator(1);
    };
    
  }]);
