(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.factory('TicketsService', TicketsService);

	function TicketsService($http, $q){
		
		var statusCallback, selectedStatus, ticketCallback = [];

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

		function updateTicketDetails(id, data){
			var deferred = $q.defer();
			$http({
				url: '/api/tickets/' + id,
				method: 'PATCH',
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
	
		function setStatus(status){
			selectedStatus = status;
			if(statusCallback){
				statusCallback(status);
			}
		}

		function updateTicketList(ticket){
			angular.forEach(ticketCallback,function(callback){
				callback(ticket);
			})
		}

		var registerTicketListCallback = function(callback){
			ticketCallback.push(callback);
		}

		function getSelectedStatus(){
			return selectedStatus;
		}

		var registerStatusCallback = function(callback){
			statusCallback = callback;
		};

		function checkAndUpdateList(ticketList, ticket){
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
			return ticketList;
		}

		return {
			getAllTickets: getAllTickets,
			getSelectedStatus: getSelectedStatus,
			getAssigneeList: getAssigneeList,
			createTicket: createTicket,
			setStatus: setStatus,
			registerStatusCallback: registerStatusCallback,
			getTicketDetails: getTicketDetails,
			updateTicketDetails: updateTicketDetails,
			registerTicketListCallback: registerTicketListCallback,
			updateTicketList: updateTicketList,
			checkAndUpdateList: checkAndUpdateList
		}
	}
})(angular);