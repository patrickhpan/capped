const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);

module.exports = mongoose;