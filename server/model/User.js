const mongoose = require('mongoose');
const { Schema } = mongoose;
const strategy = require('passport-local-mongoose');
require('mongoose-type-email');

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    }
});

User.plugin(strategy, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', User);