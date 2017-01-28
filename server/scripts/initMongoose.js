const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let connection = mongoose.createConnection(process.env.MONGODB);
connection.on('error', err => {
    console.error(`MongoDB connection error: ${err.toString()}`);
})
module.exports = mongoose;