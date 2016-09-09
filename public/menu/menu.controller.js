(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('MenuController', MenuController);

	function MenuController($scope, $state, ticketList, TagService, TicketService){
		$scope.selectedStatus;
		var selectedTag;
		intializeTicketCount();

		function intializeTicketCount(){
			$scope.ticketStatusCount = {
				open: 0,
				pending: 0,
				closed: 0
			};
			ticketList.map(function(ticket){
				if(selectedTag){
					if(ticket.tag_id === selectedTag){
						$scope.ticketStatusCount[ticket.status] += 1;
					}
				} else{
					$scope.ticketStatusCount[ticket.status] += 1;
				}
			});
		}

		$scope.setStatus = function(status){
			TicketService.setStatus(status);
			$scope.selectedStatus = status;
			$state.go('home');
		}

		TicketService.registerResetMenuBar(function(){
			$scope.selectedStatus = undefined;
		});

		TicketService.registerTicketListCallback(function(ticket){
			ticketList = TicketService.checkAndUpdateList(ticketList, ticket);
			intializeTicketCount();
		});

		TagService.registerTagCallback(function(id){
			selectedTag = id;
			intializeTicketCount();
		});
	}
})(angular);