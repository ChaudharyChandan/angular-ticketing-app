(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.controller('HeaderController', HeaderController);

	function HeaderController($scope, $state, ticketList, tagList, TagService, TicketService){
		$scope.searchedTag;
		$scope.overlay;
		$scope.goToHomeState = function(){
			TicketService.resetMenuBar();
			$scope.resetTagSelection();
		}

		$scope.openTagSuggestion = function(event){
			event.target.blur();
			$scope.tags = tagList;
			$scope.overlay = true;
		}

		$scope.selectTag = function(tag){
			$scope.searchedTag = tag;
			$scope.closeOverlay();
			TagService.setTag(tag.id);
			$state.go('home');
		}

		$scope.resetTagSelection = function(){
			$scope.searchedTag = undefined;
			TagService.setTag();
		}
		$scope.closeOverlay = function(){
			$scope.overlay = undefined;
			$scope.tags = null;
		}
	}
})(angular);