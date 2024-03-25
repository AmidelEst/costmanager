const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	id: { type: String, required: true },
	email: { type: String, required: true },
});

module.exports = mongoose.model('Developers', DeveloperSchema);
