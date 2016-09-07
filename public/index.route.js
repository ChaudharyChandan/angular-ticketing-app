(function(angular){

  'use strict';
  angular
	.module('angular-ticketing-app')
	.config(routerConfig);

  function routerConfig($stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
	$urlMatcherFactoryProvider.strictMode(false);
	$urlRouterProvider.otherwise('/tickets');
    $stateProvider
		.state('home', {
			url: '/tickets',
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
			url: '/new',
			views: {
				"main@home": {
					templateUrl: 'create/create-ticket.html',
					controller: 'CreateTicketController'
				}
			}
		})
		.state('home.ticket-details',{
			url: '/{id}',
			views: {
				"main@home": {
					templateUrl: 'details/ticket-details.html',
					controller: 'TicketDetailsController'
				}
			}
		});
		$locationProvider.html5Mode(true);
  }
})(angular);