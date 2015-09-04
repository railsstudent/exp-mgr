'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .value('categoryList', ["Food", "Fuel", "Grocery", "Entertainment"])
  .factory('expService', ['$q', function($q) {
  		var prefix = 'exp-mgr';
  		return {
  			saveExpense : function _saveExpense(data) {

          var deferred = $q.defer();

          setTimeout(function() {

            try {
    				  var timestamp = Math.round(new Date().getTime());
    				  var key = prefix + timestamp;

    				  data = JSON.stringify(data);
    				  localStorage[key] = data;
              deferred.resolve("Expense is added successfully.");
            } catch (e) {
              console.log("Got an error!", e);
              deferred.reject("Expense cannot be added.");
            }
          });

          return deferred.promise;
  			},

  			getExpense : function _getExpense() {
  				var expenses = [];
  				var keys = _.filter(_.keys(localStorage), 
  						function(key) {
  							return key.substring(0, prefix.length) == prefix; 	
  						});

  				_.forEach(keys, function(key) {
  					var data = window.localStorage[key];
  					data = JSON.parse(data);
            data.key = key;
  					expenses.push(data);
  				});
  				return expenses;
  			},

  			getCategoryTotal: function _getCategoryTotal(category) {
			  	
				var keys = _.filter(_.keys(localStorage), 
  						function(key) {
  							return key.substring(0, prefix.length) == prefix; 	
  						});

  				console.log(keys);
  
  				var categoryTotal = 0;				
  				_.forEach(keys, function(key) {
  					var data = window.localStorage[key];
  					data = JSON.parse(data);
  					if (data.category == category) {
  						categoryTotal += parseFloat(data.amount);
  					}
  				});
			 	return categoryTotal;
			}
  		};
  }]);
