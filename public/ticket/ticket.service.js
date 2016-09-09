(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.factory('TicketService', TicketService);

	function TicketService($http, $q){
		
		var statusCallback, selectedStatus, menuResetCallback, ticketCallback = [];

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

		function resetMenuBar(){
			setStatus();
			menuResetCallback();
		}

		function registerResetMenuBar(callback){
			menuResetCallback = callback;
		}

		return {
			getAllTickets: getAllTickets,
			getSelectedStatus: getSelectedStatus,
			createTicket: createTicket,
			setStatus: setStatus,
			registerStatusCallback: registerStatusCallback,
			getTicketDetails: getTicketDetails,
			updateTicketDetails: updateTicketDetails,
			registerTicketListCallback: registerTicketListCallback,
			updateTicketList: updateTicketList,
			checkAndUpdateList: checkAndUpdateList,
			registerResetMenuBar: registerResetMenuBar,
			resetMenuBar: resetMenuBar
		}
	}
})(angular);