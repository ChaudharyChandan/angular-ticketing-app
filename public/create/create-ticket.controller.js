(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('CreateTicketController', CreateTicketController);

	function CreateTicketController($scope, $log, $state, TicketsService){

		$scope.assignees = [];
		$scope.ticket = {
			type: "email",
			subject: "",
			description: "",
			status: "open",
			assignee: null
		}

		$scope.user = {
			name: "",
			email: "",
			phone: ""
		}

		TicketsService.getAssigneeList()
		.then(function(data){
			$scope.assignees = data;
		}, function(){
			$log.log('Failed to get assignees list');
		})

		$scope.createTicket = function(){
			TicketsService.createTicket($scope.user, $scope.ticket)
			.then(function(data){
				$state.go('home.ticket-details',{
					id: data.id
				});
			}, function(data){
				$log.log(data);	
			})
		}
	}
})(angular);