const express = require('express');
const router = express.Router();

const {
	addcost,
	report,
	about,
	adddeveloper,
} = require('../controllers/userController');

router.post('/addcost', addcost);

router.get('/report', report);

router.get('/about', about);
//------
router.post('/adddeveloper', adddeveloper);

module.exports = router;
