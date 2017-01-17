const fs = require('fs');
const Promise = require('bluebird');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path')

/**
 * extractThumbnails(fname, numFrames) extracts numFrames thumbnails from 
 * the video with name fname.
 */
function extractThumbnails(fname, numFrames = 10) {
    // Get the absolute path of the file.
    let fullname = path.join(
        __dirname,
        '..',
        'temp',
        'videos',
        fname
    ); 
    return new Promise((resolve, reject) => {
        // using done and fnames in order to ensure that the conversion is 
        // finished and we also have the filenames
        // done represents if the conversion is done
        let done = false;
        // fnames contains the filenames
        let fnames = null;

        ffmpeg(fullname)
            .on('filenames', filenames => {
                // resolve with the filenames if conversion already finished
                // else, store them so they can be returned later
                if (done) {
                    resolve(fnames)
                } else {
                    fnames = filenames;
                }
            })    
            .on('end', () => {
                // resolve with the filenames if conversion already finished
                // else, set done to true so on('filenames') can resolve
                if (fnames === null) {
                    resolve(fnames)
                } else {
                    done = true;
                }
            })
            .thumbnails({
                count: numFrames,
                filename: `${fname}-%0000.s.png`,
                folder: 'server/temp/thumbnails',
            })
    })
}

/**
 * getVideoLength(fname) returns a Promise that resolves with the length of
 * the video at fname, in seconds.
 */

function getVideoLength(fname) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(fullname, (err, metadata) => {
            if (err) {
                reject(err)
            } else {
                let length = metadata.streams[0].duration;
                resolve(length);
            }
        })
    })
}

module.exports = {
    extractThumbnails
}