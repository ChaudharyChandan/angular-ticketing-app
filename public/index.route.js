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
				ticketList: function(TicketService){
					return TicketService.getAllTickets();
				},
				tagList: function(TagService){
					return TagService.getTagList();
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
					templateUrl: 'ticket/list/ticket.html',
					controller: 'TicketController'
				}
			}
		})
		.state('home.create-ticket',{
			url: '/new',
			views: {
				"main@home": {
					templateUrl: 'ticket/new/new-ticket.html',
					controller: 'NewTicketController'
				}
			}
		})
		.state('home.ticket-details',{
			url: '/{id}',
			views: {
				"main@home": {
					templateUrl: 'ticket/details/ticket-details.html',
					controller: 'TicketDetailsController'
				}
			}
		});
		$locationProvider.html5Mode(true);
  }
})(angular);