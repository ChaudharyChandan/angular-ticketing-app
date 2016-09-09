var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var tagSchema = new Schema({
	id: Number,
  name: String
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;