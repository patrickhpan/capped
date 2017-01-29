const express = require('express');
const {
    exists,
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

        res.end(
            exists(ytid) === true ?
                'true' :
                'false'
        );  
    })

    router.all('/analyze/:ytid', (req, res) => {
        let email = process.env.MAILGUN_AUTHORIZED_EMAIL;
        let ytid = req.params.ytid;

        if (exists(ytid) === true) {
            res.json({
                status: 'done'
            });
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

        res.json({
            status: 'processing',
            error: false
        })
    })

    router.get('/info/:ytid', (req, res) => {
        let ytid = req.params.ytid;
        console.log(ytid)

        videoInfo.get(ytid).then(data => {
            res.json(data)
        })
    })

    return router;
}

module.exports = createAnalyzeVideoRoute;