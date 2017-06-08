const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use(function (req, res, next) {
    if (req.isUnauthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
});

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

router.use(function (req, res) {
    res.redirect('/auth/signin');
});

module.exports = router;