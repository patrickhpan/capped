require('dotenv').config();
const Promise = require('bluebird')
const PromiseThrottler = require('./server/apis/PromiseThrottler');
const analyzeVideo = require('./server/controllers/analyzeVideo');

let throttler = new PromiseThrottler(18, 60000);

analyzeVideo.analyzeYTVideo('', throttler).then(console.log.bind(this));