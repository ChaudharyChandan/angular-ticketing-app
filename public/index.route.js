(function(angular){

  'use strict';
  angular
	.module('angular-ticketing-app')
	.config(routerConfig);

  function routerConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
		.state('home', {
			url: '/',
			resolve: {
				ticketList: function(TicketsService){
					return TicketsService.getAllTickets();
				}
			},
			views: {
				"@": {
					templateUrl: 'home/home.html'
				},
				"header@home": {
					templateUrl: 'header/header.html',
					controller: 'HeaderController'
				},
				"menu@home": {
					templateUrl: 'menu/menu.html',
					controller: 'MenuController'
				},
				"main@home": {
					templateUrl: 'tickets/tickets.html',
					controller: 'TicketsController'
				}
			}
		})
		.state('home.create-ticket',{
			url: '^/tickets/new',
			views: {
				"main@home": {
					templateUrl: 'create/create-ticket.html',
					controller: 'CreateTicketController'
				}
			}
		})
		.state('home.ticket-details',{
			url: '^/tickets/{id}',
			views: {
				"main@home": {
					templateUrl: 'details/ticket-details.html',
					controller: 'TicketDetailsController'
				}
			}
		});
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
  }
})(angular);