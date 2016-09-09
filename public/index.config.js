(function(angular) {
  'use strict';

  angular
    .module('angular-ticketing-app')
    .config(config);

	function config($logProvider, toastrConfig) {

    // Set options angular toastr
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
	}
})(angular);