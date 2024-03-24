const moment = require('moment');
const Cost = require('../models/costs');
const User = require('../models/users');
const Developer = require('../models/developers');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
	// 1. POST: input parameters(7): user_id, year, month, day, description, category, and sum
	addcost: async (req, res) => {
		try {
			const { user_id, year, month, day, description, category, sum } =
				req.body;
			const cost = new Cost({
				user_id,
				year,
				month,
				day,
				description,
				category,
				sum,
			});
			cost.save().then(() => {
				res.status(200).json({
					message: 'success',
				});
			});
		} catch (error) {
			// Handle potential errors
			res.status(500).json({ message: 'Error adding cost', error });
		}
	},

	// 2. GET: input parameters(3): user_id, month, year
	report: async (req, res) => {
		const { user_id, month, year } = req.params;

		try {
			// Query the database for costs related to the user, month, and year
			const costs = await Cost.find({
				user_id: user_id,
				month: parseInt(month, 10),
				year: parseInt(year, 10),
			});
			// Initialize an object with all categories set to empty arrays

			const report = {
				food: [],
				health: [],
				housing: [],
				sport: [],
				education: [],
				transportation: [],
				other: [],
			};
			// Populate the report object with the queried costs
			costs.forEach((cost) => {
				const { day, description, sum, category } = cost;
				report[category].push({ day, description, sum });
			});
			// Send the structured report as a response
			res.status(200).json(report);
		} catch (error) {
			// Handle potential errors
			res.status(500).json({ message: 'Error generating report', error });
		}
	},

	//3. GET: NO INPUTS
	about: async (req, res) => {
		try {
			Developer.find().then((developers) => {
				res.status(200).json({ developers });
			});
		} catch (error) {
			// Handle potential errors
			res.status(500).json({ message: 'Error on about', error });
		}
	},
	//-------------added methods--------------------------

	//-- added method 1: add user
	adduser: (req, res) => {
		const { id, first_name, last_name, birthday } = req.body;
		// Attempt to parse the birthday using a specific format
		const parsedDate = moment(birthday, 'MMMM, Do, YYYY', true);
		if (!parsedDate.isValid()) {
			res.json({
				message:
					'Invalid date format for birthday. Use "MMMM, Do, YYYY".',
			});
		}

		const cost = new User({
			first_name,
			last_name,
			id,
			birthday: parsedDate.toDate(), // Convert to JavaScript Date object
		});

		cost.save()
			.then(() => {
				res.status(200).json({
					message: 'success',
				});
			})
			.catch((error) => {
				res.status(500).json({
					message: error,
				});
			});
	},

	//-- added method 2: add developer
	adddeveloper: (req, res) => {
		const { firstname, lastname, id, email } = req.body;
		const cost = new Developer({
			firstname,
			lastname,
			id,
			email,
		});

		cost.save()
			.then(() => {
				res.status(200).json({
					message: 'success',
				});
			})
			.catch((error) => {
				res.status(500).json({
					message: error,
				});
			});
	},
};
