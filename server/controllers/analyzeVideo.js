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
function analyzeYTVideo(ytid) {
    // 1. Download video
    // 2. Extract frames
    // 3. Caption frames

    youtube.dlVideo(ytid)
        .then(fname => {
            let frames = ffmpeg.extractThumbnails(fname);
            let captions = Promise.map(frames, frame => {
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