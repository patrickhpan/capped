const mongoose = require('mongoose');
const { Schema } = mongoose;
const strategy = require('passport-local-mongoose');

const User = new Schema({});
User.plugin(strategy);

module.exports = mongoose.model('User', User);