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
        if (!req.user) {
            res.json({
                error: true,
                status: "Not signed in"
            })
        }
        let email = req.user.email;
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
                        if (!data) {
                            res.json({
                                error: true,
                                status: 'Video does not exist.'
                            })
                            return;    
                        }

                        res.json({
                            error: false,
                            status: 'processing'
                        })

                        let { title } = data;
                        
                        analyze(ytid, throttler) 
                            .then(data => {
                                videoInfo.set(ytid, data, title)
                                return data;
                            })
                            .then(data => {
                                if (email !== null) {
                                    notify(ytid, req.user.name, title, email);   
                                }
                                return data;
                            })
                            .catch(err => {
                                global.devlog(err)
                                videoInfo.set(ytid, {
                                    error: true
                                }, 'Error')
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

    router.get('/some', (req, res) => {
        let number = req.query.number || 20;
        videoInfo.getSome(number).then(res.json.bind(res))
    })

    return router;
}

module.exports = createAnalyzeVideoRoute;