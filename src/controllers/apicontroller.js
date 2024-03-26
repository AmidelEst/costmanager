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

// Import required libraries and models
const moment = require('moment'); // For handling dates and times
const Cost = require('../models/costs'); // The Cost model from the models directory
const User = require('../models/users'); // The User model from the models directory
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
mongoose.Promise = global.Promise; // Setting mongoose to use Node's global Promise

// Exporting module functions
module.exports = {
	/**
	 * Adds a new cost entry to the database.
	 * @param {Object} req The request object containing the body with cost details.
	 * @param {Object} res The response object to send back the added cost data or error.
	 */
	addcost: async (req, res) => {
		try {
			// Destructuring MUST HAVE PARAMETERS to create cost from request body
			const { user_id, description, category, sum } = req.body;
			// Destructuring OPTIONAL PARAMETERS to create cost from request body
			let { year, month, day } = req.body;

			// Get the current date values if year, month, or day is not provided
			const currentDate = new Date();
			year = year || currentDate.getFullYear();
			month = month || currentDate.getMonth() + 1; // Add 1 because JavaScript months start from 0
			day = day || currentDate.getDate();

			// Creating a new Cost instance with extracted details
			const cost = new Cost({
				user_id,
				year,
				month,
				day,
				description,
				category,
				sum,
			});

			// Saving the new Cost instance to the database
			await cost.save();
			res.status(200).json({
				message: 'success',
				id: cost.id,
			});
		} catch (error) {
			console.error('Error adding cost:', error);
			res.status(500).json({
				message: 'Error adding cost',
				error: error.message,
			});
		}
	},

	/**
	 * Generates a monthly report of costs for a specific user, grouped by category.
	 * @param {Object} req The request object containing the query with user_id, month, and year.
	 * @param {Object} res The response object to send back the generated report or error.
	 */
	report: async (req, res) => {
		// Destructuring required fields from URL
		const { user_id, month, year } = req.query;
		const parsedMonth = parseInt(month, 10); // Parsing month to integer
		const parsedYear = parseInt(year, 10); // Parsing year to integer

		try {
			// Defining the aggregation pipeline for grouping costs
			const pipeline = [
				{
					$match: {
						// Filtering documents by user_id, month, and year
						user_id: user_id,
						month: parsedMonth,
						year: parsedYear,
					},
				},
				{
					$group: {
						// Grouping results by category
						_id: '$category',
						costs: {
							// Aggregating cost details
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
						// Defining the output format
						_id: 0,
						category: '$_id',
						costs: 1,
					},
				},
			];

			const report = await Cost.aggregate(pipeline);

			// Preparing the formatted report object
			let formattedReport = {
				food: [],
				health: [],
				housing: [],
				sport: [],
				education: [],
				transportation: [],
				other: [],
			};

			// Populating the formattedReport with the aggregated data
			report.forEach((item) => {
				formattedReport[item.category] = item.costs;
			});
			// Returning the formatted report
			res.status(200).json(formattedReport);
		} catch (error) {
			// On error, return a 500 status with the error message
			res.status(500).json({
				message: 'Error generating report',
				error: error.message,
			});
		}
	},

	//3. about: GET: NO INPUTS
	/**
	 * Provides information about the developers.
	 * @param {object} req - The request object.
	 * @param {object} res - The response object.
	 */
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

	/**
	 * Adds a new user to the database.
	 * This function is designed to handle the POST request to add a new user.
	 * It expects an ID, first name, last name, and birthday in the request body.
	 *
	 * @param {Object} req The request object, containing the user details in its body.
	 * @param {Object} res The response object used to send back the status of the operation.
	 */
	adduser: async (req, res) => {
		try {
			// Destructuring required fields from request body
			const { id, first_name, last_name, birthday } = req.body;

			// Parsing the birthday using moment.js to ensure valid format
			const parsedDate = moment(birthday, 'MMMM, Do, YYYY', true);

			// Check if the parsed date is valid, return error if not
			if (!parsedDate.isValid()) {
				return res.status(400).json({
					message:
						'Invalid date format for birthday. Use "MMMM, Do, YYYY".',
				});
			}

			// If the date is valid, proceed to create a new User instance
			const user = new User({
				first_name,
				last_name,
				id,
				birthday: parsedDate.toDate(), // Convert the moment object to a JS Date object
			});

			// Save the new user to the database
			await user.save();

			// Respond with success if the user is added without errors
			res.status(200).json({ message: 'success' });
		} catch (error) {
			// Catch any errors during the process and return a 500 error status
			res.status(500).json({
				message: 'Error adding user',
				error: error.message, // Include the error message for debugging
			});
		}
	},
};
