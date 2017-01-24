const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const youtube = require('../apis/youtube');
const ffmpeg = require('../apis/ffmpeg');
const msCogServ = require(process.env.NODE_ENV === 'production' ? '../apis/msCogServ' : '../apis/msCogServMock');


function exists(ytid) {
    return false;
}

/**
 * analyzeVideo(ytid) 
 */
function analyze(ytid, throttler) {
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
                        let {
                            description,
                            faces
                        } = data;
                        return {
                            description, faces
                        }
                    })    
                    .then(data => {
                        return {
                            data: data,
                            timestamp: frame.timestamp
                        }
                    })
            })
        })        
}

module.exports = {
    exists,
    analyze
}