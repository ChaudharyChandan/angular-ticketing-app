(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.factory('TicketsService', TicketsService);

	function TicketsService($http, $q){
		
		var statusCallback, selectedStatus;

		function setStatus(status){
			selectedStatus = status;
			if(statusCallback){
				statusCallback(status);
			}
		}

		function getSelectedStatus(){
			return selectedStatus;
		}

		var registerStatusCallback = function(callback){
			statusCallback = callback;
		};

		function getAllTickets(){
			var deferred = $q.defer();
			$http({
				url: '/api/tickets',
				method: 'GET'
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}

		function getTicketDetails(id){
			var deferred = $q.defer();
			$http({
				url: '/api/tickets/' + id,
				method: 'GET'
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}

		function getAssigneeList(){
			var deferred = $q.defer();
			$http({
				url: '/api/assignees',
				method: 'GET'
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}

		function createTicket(user, ticket){
			var deferred = $q.defer();
			$http({
				url: '/api/tickets',
				method: 'POST',
				data: {
					ticket: ticket,
					user: user
				}
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}

		function changeTicketStatus(id, status){
			var deferred = $q.defer();
			$http({
				url: '/api/tickets/' + id + '/status',
				method: 'PUT',
				data: status
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}

		function updateTicketDetails(data){
			var deferred = $q.defer();
			$http({
				url: '/api/tickets/' + id,
				method: 'PUT',
				data: data
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;			
		}

		return {
			getAllTickets: getAllTickets,
			getSelectedStatus: getSelectedStatus,
			getAssigneeList: getAssigneeList,
			createTicket: createTicket,
			setStatus: setStatus,
			registerStatusCallback: registerStatusCallback,
			getTicketDetails: getTicketDetails,
			changeTicketStatus: changeTicketStatus,
			updateTicketDetails: updateTicketDetails
		}
	}
})(angular);