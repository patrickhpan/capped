const express = require('express');

const PromiseThrottler = require('./apis/PromiseThrottler');
let analysisThrottler = new PromiseThrottler(9, 1000, 500);

let app = express.Router();

const createAnalyzeVideoRoute = require('./routes/analyzeVideo');
const analyzeVideoRoute = createAnalyzeVideoRoute(analysisThrottler);

app.use('/video-info', analyzeVideoRoute);

module.exports = app;
