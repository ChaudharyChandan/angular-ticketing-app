(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketDetailsController', TicketDetailsController);

	function TicketDetailsController($scope, $log, $stateParams, TicketsService){
		var id = $stateParams.id;
		$scope.editMode = false;
		$scope.assignees = [];
		var editTicketCopy;

		TicketsService.getTicketDetails($stateParams.id)
		.then(function(data){
			$scope.ticket = data;
			$scope.updatedAt = (new Date(data.updated_at)).toLocaleString();
		}, function(){
			$log.log('Unable to get ticket details');
		});

		TicketsService.getAssigneeList()
		.then(function(data){
			$scope.assignees = data;
		}, function(){
			$log.log('Failed to get assignees list');
		});

		$scope.enableEditMode = function(){
			$scope.editMode = true;
			$scope.editTicket = {
				subject: $scope.ticket.subject,
				status: $scope.ticket.status,
				description: $scope.ticket.description,
				assignee_id: $scope.ticket.assignee_id
			};
			editTicketCopy = angular.copy($scope.editTicket);
		}

		$scope.updateTicketDetails = function(){
			if(!angular.equals(editTicketCopy, $scope.editTicket)){
				TicketsService.updateTicketDetails(id, $scope.editTicket)
				.then(function(data){
					$scope.disableEditMode();
					$scope.ticket = data;
					$scope.updatedAt = (new Date(data.updated_at)).toLocaleString();
					TicketsService.updateTicketList(data);
				}, function(data){
					$log.log(data);
				})
			}
		}
	
		$scope.disableEditMode = function(){
			$scope.editMode = false;
		}

		$scope.getAssigneeName = function(id){
			var assignee = $scope.assignees.find(function(assignee){
				return assignee.id === id;
			});
			if(assignee){
				return assignee.name;
			} else{
				return "";
			}
		}
	}
})(angular);