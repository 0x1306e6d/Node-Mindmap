const express = require('express');
const router = express.Router();

router.route('/signin')
    .get(function (req, res) {
        res.render('layouts/signin');
    })
    .post(function (req, res) {

    });

router.route('/signup')
    .get(function (req, res) {
        res.render('layouts/signup');
    })
    .post(function (req, res) {

    });

module.exports = router;