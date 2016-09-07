(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('TicketDetailsController', TicketDetailsController);

	function TicketDetailsController($scope, $log, $stateParams, TicketsService){
		var id = $stateParams.id;
		TicketsService.getTicketDetails($stateParams.id)
		.then(function(data){
			$scope.ticket = data;
		}, function(){
			$log.log('Unable to get ticket details');
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
	}
})(angular);