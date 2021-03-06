const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const youtube = require('../apis/youtube');
const ffmpeg = require('../apis/ffmpeg');
const msCogServ = require(process.env.NODE_ENV === 'production' ? '../apis/msCogServ' : '../apis/msCogServMock');


function videoExists(ytid) {
    return youtube.getInfo(ytid)
        .catch(err => {
            console.error(err);
            return false
        });
}

/**
 * analyzeVideo(ytid) 
 */
function analyze(ytid, throttler) {
    // 1. Download video
    // 2. Extract frames
    // 3. Caption frames

    global.devlog(`Starting analysis of ${ytid}`)
    return youtube.dlVideo(ytid)
        .catch(err => {
            console.error(err);
            return err;
        })    
        .then(fname => {
            global.devlog(`Downloaded ${fname}`);
            return ffmpeg.extractThumbnails(fname);
        })
        .then(frames => {
            global.devlog(`Extracted ${frames[0].fname}`);
            return Promise.map(frames, frame => {
                let fname = path.join(
                    __dirname,
                    '../..',
                    '.temp',
                    'thumbnails',
                    frame.fname
                )
                if (!fs.existsSync(fname)) {
                    console.error(`${fname} does not exist :(`)
                    return Promise.resolve({
                        data: {
                            description: {
                                tags: [],
                                captions: [
                                    {
                                        text: "No image recognized",
                                        confidence: 0
                                    }
                                ]
                            },
                            faces: []
                        }
                    })
                }
                let readStream = fs.createReadStream(fname);
                let promiseFactory = () => msCogServ.generateCVRequest(readStream);
                return throttler.exec(promiseFactory)
                    .then(data => {
                        let {
                            description,
                            faces
                        } = data;
                        return {
                            description,
                            faces
                        }
                    })
                    .then(data => {
                        return {
                            data: data,
                            timestamp: frame.timestamp
                        }
                    })
            })
                .then(data => {
                    global.devlog(`Analyzed ${frames.length} frames from ${ytid}`);
                    return data;
                })

        })
}

module.exports = {
    videoExists,
    analyze
}