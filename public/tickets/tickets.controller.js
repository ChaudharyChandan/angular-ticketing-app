(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketsController', TicketsController);

	function TicketsController($scope, $interval, ticketList, TicketsService){
		$scope.ticketList = ticketList;
		$scope.selectedStatus = TicketsService.getSelectedStatus();

		TicketsService.registerStatusCallback(function(status){
			$scope.selectedStatus = status;
		});
	
		TicketsService.registerTicketListCallback(function(ticket){
			var ticketsLen = ticketList.length;
			for(var i=0;i<ticketsLen;i++){
				if(ticketList[i].id == ticket.id){
					ticketList[i] = ticket;
					break;
				}
			}
			if(i===ticketsLen){
				ticketList.push(ticket);
			}
		});

		$interval(function(){
			angular.forEach($scope.ticketList, function(ticket){
				ticket.timeAgo = (new Date()).getAgo(ticket.updated_at);
			})
		}, 1000);
		
	}
})(angular);