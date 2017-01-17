const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const youtube = require('./youtube');
const ffmpeg = require('./ffmpeg');
const msCogServ = require('./msCogServ');

/**
 * analyzeYTVideo(ytid) 
 */
function analyzeYTVideo(ytid) {
    // 1. Download video
    // 2. Extract frames
    // 3. Caption frames

    youtube.dlVideo(ytid)
        .then(fname => {
            let frames = ffmpeg.extractThumbnails(fname);
            let captions = Promise.map(frames, frame => {
                console.log(frame.timestamp);
                let fname = path.join(
                    __dirname,
                    '..',
                    'temp',
                    'thumbnails',
                    frame.fname
                )
                let readStream = fs.createReadStream(fname);
                return msCogServ.generateCVRequest(readStream)
                    .then(data => {
                        return {
                            data: JSON.stringify(data),
                            timestamp: frame.timestamp
                        }
                    })
            }, {concurrency: 1}).then(all => {
                console.log(all)
            })
        })
}

module.exports = {
    analyzeYTVideo
}