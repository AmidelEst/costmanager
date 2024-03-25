const mongoose = require('mongoose');

const costSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			// costs are related to users through user_id, indicating a one-to-many relationship (one user, many costs).
			ref: 'User',
			required: true,
		},
		year: { type: Number, required: true },
		month: { type: Number, required: true, min: 1, max: 12 },
		day: { type: Number, required: true, min: 1, max: 31 },
		id:{type:String},
		description: { type: String, required: true },
		category: {
			type: String,
			required: true,
			enum: [
				'food',
				'health',
				'housing',
				'sport',
				'education',
				'transportation',
				'other',
			],
		},
		sum: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Cost', costSchema);
