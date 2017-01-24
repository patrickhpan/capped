const express = require('express');
const User = require('../model/User');

function createAuthRoute(passport) {
    let router = express.Router();

    router.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.passport);
        } else {
            res.json("Not authenticated")
        }
    })

    router.get('/signup', (req, res) => {
        let { username, password } = req.query;
        User.register(new User({ username }), password, err => {
            console.error(err);
        })
        res.redirect('login');
    })

    router.post('/login',
        passport.authenticate('local', { successRedirect: '..',
            failureRedirect: '..',
            failureFlash: false
        })
    );

    return router;
}

module.exports = createAuthRoute;