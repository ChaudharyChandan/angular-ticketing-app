(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('NewTicketController', NewTicketController);

	function NewTicketController($scope, $log, $state, TicketService, tagList, TagService, AssigneeService){

		$scope.assignees = [];
		$scope.tags = tagList;
		$scope.ticket = {
			type: "email",
			subject: "",
			description: "",
			status: "open",
			assignee_id: null,
			tag_id: null
		}

		$scope.user = {
			name: "",
			email: "",
			phone: ""
		}

		AssigneeService.getAssigneeList()
		.then(function(data){
			$scope.assignees = data;
		}, function(){
			$log.log('Failed to get assignees list');
		});

		$scope.createTicket = function(){
			TicketService.createTicket($scope.user, $scope.ticket)
			.then(function(data){
				$state.go('home.ticket-details', {id: data.id});
				TicketService.updateTicketList(data);
			}, function(data){
				$log.log(data);	
			})
		}
	}
})(angular);