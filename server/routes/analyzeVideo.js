const express = require('express');
const {
    videoExists,
    analyze
} = require('../controllers/analyzeVideo');
const videoInfo = require('../controllers/videoInfo');
const notify = require('../controllers/notify');

function createAnalyzeVideoRoute(throttler) {
    let router = express.Router();

    router.get('/exists/:ytid', (req, res) => {
        let ytid = req.params.ytid;
        if (!ytid) {
            res.end('false');
            return;
        }

        videoInfo.dataExists(ytid)
            .then(data => {
                res.end(data === true ?
                    'true' : 
                    'false'
                )
            })
    })

    router.all('/analyze/:ytid', (req, res) => {
        let email = process.env.MAILGUN_AUTHORIZED_EMAIL;
        let ytid = req.params.ytid;

        videoInfo.dataExists(ytid)
            .then(data => {
                if (data === true) {
                    res.json({
                        status: 'done',
                        error: false
                    })
                    return;
                } 
                videoExists(ytid)
                    .then((data) => {
                        if (data === true) {
                            res.json({
                                status: 'processing',
                                error: false
                            })  
                            
                        } else {
                            res.json({
                                error: true,
                                status: 'Video does not exist.'
                            })
                            return;
                        }
                        
                        analyze(ytid, throttler) 
                            .then(data => {
                                videoInfo.set(ytid, data)
                                return data;
                            })
                            .then(data => {
                                if (email !== null) {
                                    notify(ytid, email);   
                                }
                                return data;
                            })
                            .catch(err => {
                                global.devlog(err)
                                videoInfo.set(ytid, {
                                    error: true
                                })
                            })
                    })
            })
    })

    router.get('/info/:ytid', (req, res) => {
        let ytid = req.params.ytid;

        videoInfo.get(ytid).then(data => {
            res.json(data)
        })
    })

    return router;
}

module.exports = createAnalyzeVideoRoute;