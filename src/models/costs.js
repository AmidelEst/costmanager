/*
    developers:
        1. developer
        first name: Amit, 
        last name": Pompas, 
        id: 315072397,
        2. developer
        first name: Orel, 
        last name": Israel, 
        id: 314916974,
*/
const mongoose = require('mongoose');

const CostSchema = new mongoose.Schema({
	user_id: {
		type: String,
		// costs are related to users through user_id, indicating a one-to-many relationship (one user, many costs).
		ref: 'User',
		required: true,
	},
	year: { type: Number, required: true },
	month: { type: Number, required: true, min: 1, max: 12 },
	day: { type: Number, required: true, min: 1, max: 31 },
	id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
		auto: true,
	},
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
});

module.exports = mongoose.model('Cost', CostSchema);
