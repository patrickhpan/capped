const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl');

const ITAG_VALUES = [
    134, // 360p mp4
    135, // 480p mp4
    133, // 240p mp4
]

function dlVideo(ytid) {
    let fname = path.join(__dirname, '..', 'temp', 'videos', `${ytid}.mp4`); 

    return new Promise((resolve, reject) => {

        let writeStream = fs.createWriteStream(fname);
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

dlVideo('dQw4w9WgXcQ').then(console.log)