(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketController', TicketController);

	function TicketController($scope, $interval, ticketList, TagService, TicketService){
		$scope.ticketList = ticketList;
		$scope.selectedStatus = TicketService.getSelectedStatus();
		$scope.searchTagId = TagService.getTag();

		TicketService.registerStatusCallback(function(status){
			$scope.selectedStatus = status;
		});
	
		TicketService.registerTicketListCallback(function(ticket){
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

		TagService.registerTagCallback(function(id){
			$scope.searchTagId = id;
		})
		
	}
})(angular);