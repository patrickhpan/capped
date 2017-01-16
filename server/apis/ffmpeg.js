const fs = require('fs');
const Promise = require('bluebird');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path')

function extractThumbnails(fname, numFrames = 10) {
    console.log(fname)
    let fullname = path.join(
        __dirname,
        '..',
        'temp',
        'videos',
        fname
    ); 
    return new Promise((resolve, reject) => {
        let done = false;
        let fnames = [];

        ffmpeg(fullname)
            .on('filenames', filenames => {
                if (done) {
                    resolve(fnames)
                } else {
                    fnames = filenames;
                }
            })    
            .on('end', () => {
                if (fnames.length > 0) {
                    resolve(fnames)
                } else {
                    done = true;
                }
            })
            .thumbnails({
                count: numFrames,
                filename: `${fname}-%00i.png`,
                folder: 'server/temp/thumbnails',
            })
    })
}

function getVideoLength(fname, cb) {
    ffmpeg.ffprobe(fullname, (err, metadata) => {
        let length = metadata.streams[0].duration;
        cb(length)
    })
}

module.exports = {
    extractThumbnails
}