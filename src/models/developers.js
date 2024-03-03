const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	id: { type: String, required: true },
	email: { type: String, required: true },
});

module.exports = mongoose.model('Developer', developerSchema);
