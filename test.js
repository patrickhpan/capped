require('dotenv').config();
const mailgun = require('./server/apis/mailgun');
mailgun.sendMail('services@patrickpan.com', {
    subject: 'hello world',
    text: 'hello world'
}).then(console.log.bind(console)).catch(console.error.bind(console))
// const Promise = require('bluebird')
// const PromiseThrottler = require('./server/apis/PromiseThrottler');
// const analyzeVideo = require('./server/controllers/analyzeVideo');

// let throttler = new PromiseThrottler(9, 1000, 500);

// analyzeVideo.analyze('2GZrPR5Ajrs', throttler).then(console.log.bind(this));

