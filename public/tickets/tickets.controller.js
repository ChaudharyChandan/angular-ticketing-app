(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketsController', TicketsController);

	function TicketsController($scope, $interval, ticketList, TicketsService){
		$scope.ticketList = ticketList;
		$scope.selectedStatus;

		TicketsService.registerStatusCallback(function(status){
			$scope.selectedStatus = status;
		});

		$interval(function(){
			angular.forEach($scope.ticketList, function(ticket){
				ticket.timeAgo = (new Date()).getAgo(new Date(ticket.updated_at).toISOString());
			})
		}, 1000);
		
	}
})(angular);