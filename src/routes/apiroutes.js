const express = require('express');
const router = express.Router();

const {
	addcost,
	report,
	about,
	adduser,
} = require('../controllers/apicontroller');

// 1. POST = passing params in request body. input parameters(7): user_id, year, month, day, description, category, and sum
router.post('/addcost', addcost);

// 2. GET = passing params in request URL. input parameters(3): user_id, month, year
router.get('/report', report);

// 3. GET
router.get('/about', about);
//------

//-------------added methods--------------------------

//-- added method 1: add user
router.post('/adduser', adduser);


module.exports = router;
