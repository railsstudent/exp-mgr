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
  		
      var initExpenses = function _initExpenses() {

        $scope.expenses = expService.getExpense();
        $scope.selections = [];
        for (var i = 0; i < $scope.expenses.length; i++) {
          $scope.selections.push(false);
        }

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
