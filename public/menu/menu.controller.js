(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('MenuController', MenuController);

	function MenuController($scope, $state, ticketList, TicketsService){
		$scope.selectedStatus = undefined;
		intializeTicketCount();

		function intializeTicketCount(){
			$scope.ticketStatusCount = {
				open: 0,
				pending: 0,
				closed: 0
			};
			ticketList.map(function(ticket){
				$scope.ticketStatusCount[ticket.status] += 1; 
			});
		}

		$scope.setStatus = function(status){
			TicketsService.setStatus(status);
			$scope.selectedStatus = status;
			$state.go('home');
		}

		TicketsService.registerTicketListCallback(function(ticket){
			ticketList = TicketsService.checkAndUpdateList(ticketList, ticket);
			intializeTicketCount();
		});
	}
})(angular);