const express = require('express');
const passport = require('passport');

const router = express.Router();

router.route('/signin')
    .get(function (req, res) {
        res.render('layouts/signin');
    })
    .post(passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/auth/signin',
            failureFlash: true
        })
    );

router.route('/signup')
    .get(function (req, res) {
        res.render('layouts/signup');
    })
    .post(passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/auth/signup',
            failureFlash: true
        })
    );

module.exports = router;