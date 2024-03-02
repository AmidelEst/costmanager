const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		// Auto-generated, unique
		id: { type: Number, required: true, unique: true },
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		birthday: { type: Date, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
