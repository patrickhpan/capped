var VideoData = require('../model/VideoData.js');

function dataExists(ytid) {
    return VideoData.find({ 'ytid': ytid }).limit(1).exec()
        .then(cursor => {
            console.log(cursor);
            return cursor.length > 0;
        })   
}

function get(ytid) {
    // Get the analyzed data from a saved database entry of a 
    // previous analysis of the specified YouTube video
    // If not present, return null.
    return VideoData.findOne({ 'ytid': ytid }).exec()
        .then(video => {
            if (video) {
                video = (typeof video === 'string') ?
                    JSON.parse(video) :
                    video;
                console.log(video)
                return video;
            }
            return null;
        })
};

function set(ytid, data) {
    // Save the analyzed data into a database entry corresponding
    // to the YouTube video id (ytid) of the analyzed video
    //data can be String version of json file
    var newVideo = new VideoData({
        'ytid': ytid,
        'videoInfo': JSON.stringify(data)
    });

    return newVideo.save();
}

module.exports = {
    dataExists,
    get,
    set
}