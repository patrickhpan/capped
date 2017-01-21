require('dotenv').config();
const Promise = require('bluebird')
const PromiseThrottler = require('./server/apis/PromiseThrottler');
const analyzeVideo = require('./server/controllers/analyzeVideo');

let throttler = new PromiseThrottler(9, 1000, 500);

analyzeVideo('2GZrPR5Ajrs', throttler).then(console.log.bind(this));