var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var tickets = require('./routes/tickets');
var assignees = require('./routes/assignees');

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

app.use('/api/tickets', tickets);
app.use('/api/assignees', assignees);

app.all('/*', function(req, res, next) {
    res.sendFile('public/index.html', { root: __dirname });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});