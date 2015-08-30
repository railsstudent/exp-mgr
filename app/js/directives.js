'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('barChart', ['$document', '$window', 
  		function($document, $window) {
  			return {
  				scope: {
  					data: '='
  				}, 
  				link: function _link(scope, element, attributes) {
  					var chart = d3.select('#chart')
  									.append('svg')
  									.style('width', '95%');
	
  					scope.drawGraph = function _drawGraph(data) {

  						chart.selectAll('*').remove();
  							
	  					var barHeight = 30,
	  						barGap = 5,
	  						graphOrigin = 150,
	  						chartWidth = chart.style('width'),
	  						chartHeight = scope.data.length * (barHeight + barGap),
	  						color = d3.scale.category10(),
	  						xScale = d3.scale.linear()
	    								.domain([0, d3.max(data, function(d) {
	      									return d.amount;
	    							})])
	    							.range([0, chartWidth]);
							chart.attr('height', chartHeight);
				
						chart.selectAll('myBars')
						  .data(data)
						  .enter()
						  .append('rect')
						  .attr('height', barHeight)
						  .attr('x', graphOrigin)
						  .attr('y', function(d, i) {
						    return i * (barHeight + barGap);
						  })
						  .attr('fill', function(d) {
						    return color(d.amount);
						  })
						  .attr('width', function(d) {
						    return xScale(d.amount);
						  });

						  // render all category labels
						 chart.selectAll('categoryLabel')
						  .data(data)
						  .enter()
						  .append('text')
						  .attr('fill', '#000')
						  .attr('y', function(d, i) {
						    return i * (barHeight + barGap) + 20;
						  })
						  .attr('x', (graphOrigin - 5))
						  .attr('text-anchor', 'end')
						  .text(function(d) {
						    return d.category;
						  });	

  						// render all amounts
						chart.selectAll('values')
						  .data(data)
						  .enter()
						  .append('text')
						  .attr('fill', '#fff')
						  .attr('y', function(d, i) {
						    return i * (barHeight + barGap) + 15;
						  })
						  .attr('x', (graphOrigin + 5))
						  .attr('text-anchor', 'start')
						  .text(function(d) {
						    return d.amount;
						  }); 
	  				};
  					scope.drawGraph(scope.data);

  					$window.onresize = function() {
  						scope.$apply(scope.drawGraph(scope.data));
					};
  				},
  				template: '<div id="chart"></div>'
  			}
  		}]);
