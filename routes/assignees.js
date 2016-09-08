var path = require('path');
var express = require('express');
var router = express.Router();

var Assignee = require(path.join(__dirname, '../models/assignees'));

router.get('/', function(req, res){
	Assignee.find({}, function(err, assignees) {
		if (err){
			res.status(404);
			res.json({error: "Record not found"});
		} else{
			res.status(200);
			res.json(assignees);
		}
	});
});

module.exports = router;