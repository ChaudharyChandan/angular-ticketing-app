var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');
  connection = require('../connection');
autoIncrement.initialize(connection);

var ticketSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  status: String,
  type: String,
  subject: String,
  description: String,
  assignee_id: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

var Ticket = mongoose.model('Ticket', ticketSchema);

ticketSchema.plugin(autoIncrement.plugin, { model: 'Ticket', field: 'id', startAt: 100 });

module.exports = Ticket;