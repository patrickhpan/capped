var VideoData = require('../model/VideoData.js');

function get(ytid) {
    // Get the analyzed data from a saved database entry of a 
    // previous analysis of the specified YouTube video
    // If not present, return null.
    VideoData.findOne({'ytid': ytid}, function (err, video){
        if (err){
            console.log('an error occured');
        } else {
            if (video) {
                return video.videoInfo;
            } else {
                console.log('video not found');
                return null;
            }
        }
    });
};

function set(ytid, data) {
    // Save the analyzed data into a database entry corresponding
    // to the YouTube video id (ytid) of the analyzed video
    //data can be String version of json file
    var newVideo = new VideoData({
        'ytid': ytid,
        'videoInfo': JSON.stringify(data)
    });

    newVideo.save();

    return;
}

module.exports = {
    get,
    set
}