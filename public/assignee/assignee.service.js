(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.factory('AssigneeService', AssigneeService);

	function AssigneeService($http, $q){

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

		return {
			getAssigneeList: getAssigneeList
		}
	}
})(angular);