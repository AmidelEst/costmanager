const moment = require('moment');
const Cost = require('../models/Costs');
const Developer = require('../models/Developer');
const User = require('../models/Users');
const mongoose = require('mongoose');

module.exports = {
	// 1. POST: input parameters(7): user_id, year, month, day, description, category, and sum
	addcost: (req, res) => {
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

	// 2. GET: input parameters(3): user_id, month, year
	report: (req, res) => {
		const { user_id, month, year } = req.params;
		res.status(200).json({
			message: 'report',
		});
	},

	//3. GET
	about: (req, res) => {
		Developer.find()
			.then((developers) => {
				res.status(200).json({ developers });
			})
			.catch((error) => {
				res.status(500).json({
					message: error.message,
				});
			});
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
