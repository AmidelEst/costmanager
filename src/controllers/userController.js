module.exports = {
    // 1. input parameters(7): user_id, year, month, day, description, category, and sum
	addcost: (req, res) => {
		res.status(200).json({
			message: 'addcost',
		});
	},
    // 2. input parameters(3): user_id, month, year 
	report: (req, res) => {
		res.status(200).json({
			message: 'report',
		});
	},
    //3.
	about: (req, res) => {
		res.status(200).json({
			message: 'about',
		});
	},
	adddeveloper: (req, res) => {
		res.status(200).json({
			message: 'adddeveloper',
		});
	},
};
