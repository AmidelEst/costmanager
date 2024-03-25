const moment = require('moment');
const Cost = require('../models/costs');
const User = require('../models/users');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
	// 1. addcost: POST: input parameters(7): user_id, year, month, day, description, category, and sum
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

	// 2. report: GET: input  parameters(3): user_id, month, year
	report: async (req, res) => {
		const { user_id, month, year } = req.query;
		// month and year are parsed as integers
		const parsedMonth = parseInt(month, 10);
		const parsedYear = parseInt(year, 10);
		try {
			// pipeline to be used inside Cost.aggregate
			const pipeline = [
				{
					$match: {
						user_id: user_id,
						month: parsedMonth,
						year: parsedYear,
					},
				},
				{
					$group: {
						_id: '$category',
						costs: {
							$push: {
								day: '$day',
								description: '$description',
								sum: '$sum',
							},
						},
					},
				},
				{
					$project: {
						_id: 0,
						category: '$_id',
						costs: 1,
					},
				},
			];

			const report = await Cost.aggregate(pipeline);

			if (report.length === 0) {
				return res.status(404).json({
					message:
						'No costs found for the specified user, month, and year.',
				});
			}
			// Initialize an object with all categories as keys and empty arrays as values
			let formattedReport = {
				food: [],
				health: [],
				housing: [],
				sport: [],
				education: [],
				transportation: [],
				other: [],
			};
			// Fill the formattedReport with the aggregated data
			report.forEach((item) => {
				formattedReport[item.category] = item.costs;
			});
			res.status(200).json(formattedReport);
		} catch (error) {
			console.error('Error generating report:', error);
			res.status(500).json({
				message: 'Error generating report',
				error: error.message,
			});
		}
	},

	//3. about: GET: NO INPUTS
	about: async (req, res) => {
		try {
			res.status(200).json([
				{
					firstname: 'Amit',
					lastname: 'Pompas',
					id: '315072397',
					email: 'amitpom14@gmail.com',
				},
				{
					firstname: 'Orel',
					lastname: 'Israel',
					id: '314916974',
					email: 'OrelIsrael98@gmail.com',
				},
			]);
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
};
