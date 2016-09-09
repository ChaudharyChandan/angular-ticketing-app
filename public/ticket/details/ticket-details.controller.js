(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketDetailsController', TicketDetailsController);

	function TicketDetailsController($scope, $log, $stateParams, $state, toastr, tagList, TicketService, AssigneeService){
		var id = $stateParams.id;
		$scope.editMode = false;
		$scope.assignees = [];
		$scope.tags = tagList;
		var editTicketCopy;

		TicketService.getTicketDetails($stateParams.id)
		.then(function(data){
			$scope.ticket = data;
			$scope.updatedAt = (new Date(data.updated_at)).toLocaleString();
		}, function(){
			toastr.error('No such ticket available','Error');
			$state.go('home');
		});

		AssigneeService.getAssigneeList()
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
				assignee_id: $scope.ticket.assignee_id,
				tag_id: $scope.ticket.tag_id
			};
			editTicketCopy = angular.copy($scope.editTicket);
		}

		$scope.updateTicketDetails = function(){
			if(!angular.equals(editTicketCopy, $scope.editTicket)){
				TicketService.updateTicketDetails(id, $scope.editTicket)
				.then(function(data){
					$scope.disableEditMode();
					$scope.ticket = data;
					$scope.updatedAt = (new Date(data.updated_at)).toLocaleString();
					TicketService.updateTicketList(data);
					toastr.success('Ticket updated succcessfully', 'Ticket Update');
				}, function(){
					toastr.error('Ticket update failed', 'Ticket Update');
				});
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

		$scope.getTagName = function(id){
			var tag = $scope.tags.find(function(tag){
				return tag.id === id;
			});
			if(tag){
				return tag.name;
			} else{
				return "";
			}
		}
	}
})(angular);