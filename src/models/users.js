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
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	birthday: { type: Date, required: true },
});

module.exports = mongoose.model('User', UserSchema);
