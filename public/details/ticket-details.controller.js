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
		}, function(){
			$log.log('Unable to get ticket details');
		});

		TicketsService.getAssigneeList()
		.then(function(data){
			$scope.assignees = data;
		}, function(){
			$log.log('Failed to get assignees list');
		});

		$scope.changeStatus = function(status){
			if($scope.status !== status){
				TicketsService.changeTicketStatus(id, status)
				.then(function(){
					$log.log('Successfully updated the status');
				}, function(){
					$log.log('Unable to update the status');
				});
			}
		}

		$scope.enableEditMode = function(){
			$scope.editMode = true;
			$scope.editTicket = {
				subject: $scope.ticket.subject,
				status: $scope.ticket.status,
				description: $scope.ticket.description,
				assigneeId: $scope.ticket.assigneeId
			};
			editTicketCopy = angular.copy($scope.editTicket);
		}

		$scope.updateTicketDetails = function(){
			if(!angular.equals(editTicketCopy, $scope.editTicket)){
				TicketsService.updateTicketDetails($scope.editTicket)
			}
		}

		$scope.getLocaleString = function(date){
			return (new Date(date)).toLocaleString();
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

		TicketsService.getAssigneeList()
		.then(function(data){
			$scope.assignees = data;
		}, function(){
			$log.log('Failed to get assignees list');
		});
	}
})(angular);