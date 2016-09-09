var path = require('path');
var express = require('express');
var router = express.Router();

var Tag = require(path.join(__dirname, '../models/tags'));

router.get('/', function(req, res){
	Tag.find({}, function(err, tags) {
		if (err){
			res.status(404);
			res.json({error: "Record not found"});
		} else{
			res.status(200);
			res.json(tags);
		}
	});
});

module.exports = router;