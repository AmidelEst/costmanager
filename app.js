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

// Configuration for environment variables
require('dotenv').config();

// Import necessary libraries
const express = require('express');
const app = express();
const morgan = require('morgan'); // HTTP request logger middleware
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const apiRoutes = require('./src/routes/apiroutes'); // API routes
const port = 3000; // Server listening port

// MongoDB connection setup
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected successfully.'))
	.catch((err) => console.error('MongoDB connection error:', err));

// Middleware configurations
app.use(morgan('dev')); // Log all requests to the console
app.use(express.json()); // Parse JSON bodies in requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies with querystring library

// CORS (Cross-Origin Resource Sharing) headers setup for all responses
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	// Pre-flight request handling for CORS
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next(); // Continue to next middleware if not an OPTIONS request
});

// Apply API routes to the application
app.use('/', apiRoutes);

// Middleware for handling 404 Not Found errors
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error); // Pass the error to the next middleware
});

// Error handling middleware for logging and responding to all kinds of server errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message, // Provide the error message to the client
		},
	});
});

// Start the server and listen on the specified port
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
