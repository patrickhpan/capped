const fs = require('fs');
const Promise = require('bluebird');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path')

/**
 * extractThumbnails(fname, timeBetweenThumbnails) extracts thumbnails every
 * timeBetweenThumbnails seconds from the video with name fname. It returns
 * a Promise that returns an array of { fname, timestamp } objects.
 */
function extractThumbnails(fname, timeBetweenThumbnails = process.env.THUMBNAIL_FREQ || 10) {
    timeBetweenThumbnails = Number(timeBetweenThumbnails);

    // Get the absolute path of the file.
    let fullname = path.join(
        __dirname,
        '../..',
        '.temp',
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

        getVideoLength(fname)
            .then(length => {
                // generate timestamps starting at 1 and every timeBetweenThumbnails seconds
                let timestamps = [];
                for (let time = 1; time < length; time += timeBetweenThumbnails) {
                    timestamps.push(time);
                }

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
                        if (fnames !== null) {
                            resolve(fnames)
                        } else {
                            done = true;
                        }
                    })
                    .thumbnails({
                        timestamps: timestamps,
                        filename: `${fname}.%0000.s.png`,
                        folder: '.temp/thumbnails',
                    })
            })
    }).then(fnames => {
        return fnames.map(fname => {
            return {
                fname: fname,
                timestamp: Number(fname.match(/\.(\d+)\.png$/)[1])
            }
        })
    })   
}

/**
 * getVideoLength(fname) returns a Promise that resolves with the length of
 * the video at fname, in seconds.
 */

function getVideoLength(fname) {
    let fullname = path.join(
        __dirname,
        '../..',
        '.temp',
        'videos',
        fname
    ); 

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