const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoData = new Schema({
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

module.exports = mongoose.model('videoData', VideoData);