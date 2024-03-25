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
const express = require('express');
const router = express.Router(); // Create a new router object to manage routes

// Import controller functions from the API controller module
const {
	addcost, // Controller for adding a cost
	report, // Controller for generating a report
	about, // Controller for returning about information
	adduser, // Controller for adding a new user
} = require('../controllers/apicontroller');

// Define route for adding a cost entry
// Method: POST
// Path: '/addcost'
// Body Parameters: user_id, year, month, day, description, category, sum
// Description: Adds a new cost entry with details provided in the request body.
router.post('/addcost', addcost);

// Define route for generating a report
// Method: GET
// Path: '/report'
// Query Parameters: user_id, month, year
// Description: Generates a report based on the user ID, month, and year provided in the query parameters.
router.get('/report', report);

// Define route for retrieving application/about information
// Method: GET
// Path: '/about'
// Description: Returns information about the application or API.
router.get('/about', about);

// Added routes

// Define route for adding a new user
// Method: POST
// Path: '/adduser'
// Body Parameters: id, first_name, last_name, birthday
// Description: Adds a new user with the details provided in the request body.
router.post('/adduser', adduser);

module.exports = router; // Export the router for use in the main application file
