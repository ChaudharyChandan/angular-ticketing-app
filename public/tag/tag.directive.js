(function(angular){

	'use strict';
	angular.module('angular-ticketing-app')
	.directive('ngTag', function(TagService){
		return {
			restrict: 'E',
			scope: {
				id: "="
			},
			link: function(scope, elem, attrs){
				var tags = TagService.getTags();
				var tag = tags.filter(function (t) {
					return t.id === scope.id;
				})[0];
				var tagName = tag.name.toLowerCase();
				switch(tag.name.toLowerCase()){
					case 'minor': 
						elem.addClass('minor');
						elem[0].innerHTML = '&#8595;';
						break;
					case 'major':
						elem.addClass('major');
						elem[0].innerHTML = '&#8593;';
						break;
					case 'critical':
						elem.addClass('critical');
						elem[0].innerHTML = '&#8648;';
						 break;
					case 'blocker':
						elem.addClass('blocker');
						elem[0].innerHTML = '&#8654;';
						break;
				}
			}
		}
	})
})(angular);