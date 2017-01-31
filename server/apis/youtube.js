const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const ytdl = require('youtube-dl');

const ITAG_VALUES = [
    134, // 360p mp4 no-sound
    133, // 240p mp4 no-sound
    135, // 480p mp4 no-sound
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
        '../..',
        '.temp',
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

        ytdl(`http://www.youtube.com/watch?v=${ytid}`,
            ['--format=134']
        ).on('error', err => {
            reject(err);
        }).pipe(writeStream);   
    })   
}

function getInfo(ytid) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(`http://www.youtube.com/watch?v=${ytid}`, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        })
    });
}

module.exports = {
    dlVideo,
    getInfo
}