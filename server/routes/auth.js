const express = require('express');
const User = require('../model/User');

function createAuthRoute(passport) {
    let router = express.Router();

    router.get('/', (req, res) => {
        if (req.user) {
            let { email, name } = req.user;
            res.json({
                loggedIn: true,
                email,
                name
            })
            return;
        }
        res.json({
            loggedIn: false
        })
    })

    router.post('/signup', (req, res) => {
        console.log(req.body)
        let { email, name, password } = req.body; 
        if(email === undefined || name === undefined || password === undefined) {
            res.status(400).json({
                error: true,
                message: 'Both username and password must be specified.'
            });
            return;
        }

        User.register(new User({ email, name }), password, err => {
            if (err) {
                res.status(400).json({
                    error: true,
                    message: err.toString()
                })
                return;
            }
            res.status(201).json({
                error: false,
                message: 'User created.'
            })
        })
        
    })

    router.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            res.end(req.user.username)
        }
    );

    router.all('/logout', (req, res) => {
        req.logout();
        res.json({
            message: 'Logged out.',
            error: false
        });
    })

    return router;
}

module.exports = createAuthRoute;