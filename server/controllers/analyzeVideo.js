const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const PromiseThrottler = require('../apis/PromiseThrottler');
const youtube = require('../apis/youtube');
const ffmpeg = require('../apis/ffmpeg');
const msCogServ = require(process.env.NODE_ENV === 'PRODUCTION' ? '../apis/msCogServ' : '../apis/msCogServMock');

/**
 * analyzeYTVideo(ytid) 
 */
function analyzeYTVideo(ytid, throttler) {
    // 1. Download video
    // 2. Extract frames
    // 3. Caption frames

    return youtube.dlVideo(ytid)
        .then(fname => {
            return ffmpeg.extractThumbnails(fname);
        })
        .then(frames => {
            return Promise.map(frames, frame => {
                let fname = path.join(
                    __dirname,
                    '..',
                    'temp',
                    'thumbnails',
                    frame.fname
                )
                let readStream = fs.createReadStream(fname);
                let promiseFactory = () => msCogServ.generateCVRequest(readStream);
                return throttler.exec(promiseFactory)
                    .then(data => {
                        return {
                            data: JSON.stringify(data),
                            timestamp: frame.timestamp
                        }
                    })
            })
        })
}

module.exports = {
    analyzeYTVideo
}