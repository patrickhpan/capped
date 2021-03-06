const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('open', err => {
    console.error(`MongoDB connected!`);
})
mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err.toString()}`);
})
module.exports = mongoose;