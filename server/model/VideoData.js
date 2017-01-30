const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoData = new Schema({
    //contains either one long String
    //or an object contain an array containing...
    ytid:{
        type: String,
        required:true,
        index:{
            unique: true
        }
    },
    videoInfo: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('videoData', videoData);