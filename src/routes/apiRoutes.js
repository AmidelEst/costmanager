const express = require('express');
const router = express.Router();

const {
	addcost,
	report,
	about,
	adddeveloper,
	adduser,
} = require('../controllers/apiController');

// 1. POST = passing params in request body. input parameters(7): user_id, year, month, day, description, category, and sum
router.post('/addcost', addcost);

// 2. GET = passing params in request URL. input parameters(3): user_id, month, year
router.get('/report/:user_id/:month/:year', report);

// 3. GET
router.get('/about', about);
//------

//-------------added methods--------------------------

//-- added method 1: add user
router.post('/adduser', adduser);

//-- added method 2: add developer
router.post('/adddeveloper', adddeveloper);

module.exports = router;
