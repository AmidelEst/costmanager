const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');

app.get('/', (req, res) => {
	res.status(200)
		.json({
			message: 'Hello world',
		})
		.end();
});

// Db
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
	console.log('MongoDB connected');
});
//------
// middelware
app.use(morgan('dev'));
//app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});
//------

// Routes

//-------

// end middleware
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

//-----
module.exports = app;
