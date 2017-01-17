const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

const ITAG_VALUES = [
    133, // 240p mp4 no-sound
    134, // 360p mp4
    135, // 480p mp4
]

/**
 * dlVideo(ytid, fname) downloads the YouTube video with id ytid
 * to file fname, returning a Promise. If fname is unspecified, the
 * filename will be {ytid}.mp4. 
 */
function dlVideo(ytid, fname) {
    if (fname === undefined) {
        fname = `${ytid}.mp4`;
    }
    let fullname = path.join(
        __dirname,
        '..',
        'temp',
        'videos',
        fname
    ); 

    return new Promise((resolve, reject) => {
        let writeStream = fs.createWriteStream(fullname);
        writeStream.on('close', () => {
            resolve(fname);
        })
        writeStream.on('err', (err) => {
            reject(err);
        })

        ytdl(`https://www.youtube.com/watch?v=${ytid}`, {
            quality: ITAG_VALUES
        }).pipe(writeStream);   
    })   
}

module.exports = {
    dlVideo
}