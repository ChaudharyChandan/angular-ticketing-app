var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var TICKETS_FILE = path.join(__dirname, 'tickets.json');
var ASSIGNEES_FILE = path.join(__dirname, 'assignees.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/tickets', function(req, res) {
  fs.readFile(TICKETS_FILE, function(err, data) {
    if (err) {
			res.status(500);
			res.json({error: "Internal server error"});
    } else{
	  	res.status(200);
			res.json(JSON.parse(data));
		}
  });
});

app.get('/api/tickets/:id', function(req, res){
	var id = req.params.id;
	fs.readFile(TICKETS_FILE, function(err, data) {
    if (err) {
			res.status(500);
			res.json({error: "Internal server error"});
    } else{
			var tickets = JSON.parse(data), index;
			index = tickets.map(function(ticket){
				return ticket.id
			}).indexOf(id);
			if(index>=0){
				res.status(200);
				res.json(tickets[index]);
			} else{
				res.status(404);
				res.json({ message: "Not data found"});
			}
		}
  });
});

app.post('/api/tickets', function(req, res) {
  var timestamp = Date.now();
	var id = "CHT" + timestamp;
	var tickets;
  fs.readFile(TICKETS_FILE, function(err, data) {
    if (err) {
      res.status(500);
			res.json({error: "Internal server error"});
    } else{
			tickets = JSON.parse(data),
				user = req.body.user,
				ticket = req.body.ticket;
				newTicket = {
					id: id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					status: ticket.status,
					type: ticket.type,
					subject: ticket.subject,
					description: ticket.subject,
					assignee: ticket.assignee,
					// tags: req.body.tags,
					created_at: timestamp,
					updated_at: timestamp
				};
			tickets.push(newTicket);
		}
    fs.writeFile(TICKETS_FILE, JSON.stringify(tickets, null, 4), function(err) {
      if (err) {
        res.status(500).json(
					{error: "Internal server error"}
				);
      } else{
				res.status(200).json(newTicket);
			}
    });
  });
});

app.get('/api/assignees', function(req, res){
	fs.readFile(ASSIGNEES_FILE, function(err, data) {
    if (err) {
			res.status(500);
			res.json({error: "Internal server error"});
    } else{
	  	res.status(200);
			res.json(JSON.parse(data));
		}
  });
});

app.all('/*', function(req, res, next) {
    res.sendFile('public/index.html', { root: __dirname });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});