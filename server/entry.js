const express = require('express');
const cookieSession = require('cookie-session');

const mongoose = require('./scripts/initMongoose');
const passport = require('./scripts/initPassport');

const PromiseThrottler = require('./scripts/PromiseThrottler');
let analysisThrottler = new PromiseThrottler(9, 1000, 500);

let app = express.Router();

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())

const createAnalyzeVideoRoute = require('./routes/analyzeVideo');
const analyzeVideoRoute = createAnalyzeVideoRoute(analysisThrottler);

const createAuthRoute = require('./routes/auth');
const authRoute = createAuthRoute(passport)

app.use('/video-info', analyzeVideoRoute);
app.use('/auth', authRoute);

module.exports = app;
