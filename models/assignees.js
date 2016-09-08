var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var assigneeSchema = new Schema({
	id: Number,
  name: String
});

var Assignee = mongoose.model('Assignee', assigneeSchema);

module.exports = Assignee;