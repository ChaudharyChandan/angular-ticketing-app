(function(angular){

	'use strict';

	angular.module('angular-ticketing-app')
	.factory('TagService', TagService);

	function TagService($http, $q){
		var tagSelectionCallbacks = [], selectedTag, tagList;

		function registerTagCallback(callback){
			tagSelectionCallbacks.push(callback);
		}

		function setTag(tagId){
			selectedTag = tagId;
			tagSelectionCallbacks.forEach(function(callback){
				callback(tagId);
			});
		}

		function getTag(){
			return selectedTag;
		}

		function getTags(){
			return tagList;
		}

		function getTagList(){
			var deferred = $q.defer();
			$http({
				url: '/api/tags',
				method: 'GET'
			})
			.success(function(data){
				tagList = data;
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
			})
			return deferred.promise;
		}

		return {
			getTagList: getTagList,
			registerTagCallback: registerTagCallback,
			setTag: setTag,
			getTag: getTag,
			getTags: getTags
		}
	}
})(angular);