const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const apiRoutes = require('./src/routes/apiRoutes');
const port = 3000;

app.get('/', (req, res) => {
	res.status(200)
		.json({
			message: 'Hello world',
		})
		.end();
});

// Db
mongoose.connect('mongodb://127.0.0.1:27017/Cost_Manager');
mongoose.Promise = global.Promise;
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
app.use('/', apiRoutes);
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

// run server 
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
