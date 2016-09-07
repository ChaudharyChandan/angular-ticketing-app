(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketDetailsController', TicketDetailsController);

	function TicketDetailsController($scope, $log, $stateParams, TicketsService){
		TicketsService.getTicketDetails($stateParams.id)
		.then(function(data){
			$scope.ticket = data;
		}, function(){
			$log.log('Unable to get ticket details');
		})
	}
})(angular);