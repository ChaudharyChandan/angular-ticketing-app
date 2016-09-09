(function(){
	'use strict';
	describe('Ticket factory', function() {

		var TicketsService, $q, $httpBackend;
		var API = "/api/tickets";
		var RESPONSE_SUCCESS = [{
			id: 100,
			name: "Chandan Kumar",
			phone: "9619324624",
			status: "pending",
			email: "chandanchaudhary@outlook.com",
			subject: "Laptop charger issue",
			type: "email",
			assignee_id: 4,
			description: "Laptop charger issue",
			created_at: "2016-09-08T11:46:59.805Z",
			updated_at: "2016-09-08T13:42:50.038Z"
		}];

		beforeEach(angular.mock.module('angular-ticketing-app'));

		beforeEach(inject(function(_TicketsService_, _$q_, _$httpBackend_) {
			TicketsService = _TicketsService_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
		}));

		it('Should exist', function() {
			expect(TicketsService).toBeDefined();
		});

		describe('getAllTickets()', function(){
			var result;
			beforeEach(function(){
				result = null;
				spyOn(TicketsService, "getAllTickets").and.callThrough();
			});

			it('should get all tickets', function(){
				$httpBackend.whenGET(API).respond(200, $q.when(RESPONSE_SUCCESS));

				expect(TicketsService.getAllTickets).not.toHaveBeenCalled();
				expect(result).toEqual(null);

				TicketsService.getAllTickets()
				.then(function(data){
					result = data;
				});

				$httpBackend.flush();

				expect(TicketsService.getAllTickets).toHaveBeenCalled();
				expect(result).toBeDefined();
				expect(result).toEqual(jasmine.any(Array));
			});
		});

		describe('getTicketDetails()', function(){
			var result;

			beforeEach(function(){
				result = null;
				spyOn(TicketsService, "getTicketDetails").and.callThrough();
			});

			it('should get a particular ticket details', function(){
				var id = 100;

				$httpBackend.whenGET(API + '/' + id).respond(200, $q.when(RESPONSE_SUCCESS[0]));
				expect(TicketsService.getTicketDetails).not.toHaveBeenCalled();
				expect(result).toEqual(null);

				TicketsService.getTicketDetails(id)
				.then(function(data){
					result = data;
				});

				$httpBackend.flush();

				expect(TicketsService.getTicketDetails).toHaveBeenCalled();
				expect(result).toBeDefined();
				expect(result).toEqual(jasmine.any(Object));
				expect(result.id).toEqual(100);
				expect(result.name).toEqual('Chandan Kumar');
				expect(result.assignee_id).toEqual(jasmine.any(Number));
			});
		});

	});
})();