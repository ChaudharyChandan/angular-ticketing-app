(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('NewTicketController', NewTicketController);

	function NewTicketController($scope, $log, $state, toastr, TicketService, tagList, TagService, AssigneeService){

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
				TicketService.updateTicketList(data);
				$state.go('home.ticket-details', {id: data.id});
				toastr.success('Ticket created cucccessfully', 'Ticket Creation');
			}, function(){
				toastr.error('Ticket creation failed', 'Ticket Creation');
			});
		}
	}
})(angular);