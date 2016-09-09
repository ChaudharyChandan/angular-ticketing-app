var path = require('path');
var express = require('express');
var router = express.Router();

var Ticket = require(path.join(__dirname, '../models/tickets'));

router.get('/', function(req, res) {
	Ticket.find({}, function(err, tickets) {
		if (err){
			res.status(404);
			res.json({message: "Record not found"});
		} else{
			res.status(200);
			res.json(tickets);
		}
	});
});

router.get('/:id', function(req, res){
	var id = req.params.id;
	Ticket.find({id: id}, function(err, ticket) {
		if (err){
			res.status(404);
			res.json({message: "Record not found"});
		} else{
			if(ticket.length === 0){
				res.status(404);
				res.json({message: "Record not found"});
			} else{
				res.status(200);
				res.json(ticket[0]);
			}
		}
	});
});

router.post('/', function(req, res) {
	var user = req.body.user,
			ticket = req.body.ticket;
		
	var newTicket = Ticket({
		name: user.name,
		email: user.email,
		phone: user.phone,
		status: ticket.status,
		type: ticket.type,
		subject: ticket.subject,
		description: ticket.description,
		tag_id: ticket.tag_id,
		assignee_id: ticket.assignee_id
	});

	var promise = newTicket.save();
	promise.then(function(doc){
		res.status(200);
		res.json(doc);
	})
});

router.patch('/:id', function(req, res){
	var id = req.params.id;
	var data =  req.body;
	data.updated_at = new Date;
	Ticket.findOneAndUpdate({id: id}, data, {new: true}, function(err, doc) {
		if (err){
			res.status(404);
			res.json({message: "Record not found"});
		} else{
			res.status(200);
			res.json(doc);
		}
	});
});

module.exports = router;
