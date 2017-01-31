var VideoData = require('../model/VideoData.js');

function dataExists(ytid) {
    return VideoData.find({ 'ytid': ytid }).limit(1).exec()
        .then(cursor => {
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
                return video;
            }
            return null;
        })
};

function set(ytid, data, title) {
    // Save the analyzed data into a database entry corresponding
    // to the YouTube video id (ytid) of the analyzed video
    //data can be String version of json file
    var newVideo = new VideoData({
        'ytid': ytid,
        'videoInfo': JSON.stringify(data),
        'title': title
    });

    return newVideo.save();
}

function getSome(limit) {
    limit = Number(limit);
    return VideoData.find({}).select('ytid title').exec()
        .then(data => {
            return data.reverse().slice(0, limit);
        })
}

module.exports = {
    dataExists,
    get,
    set,
    getSome
}