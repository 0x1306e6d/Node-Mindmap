const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {

    } else {
        res.redirect('/auth/signin');
    }
});

const auth = require('./auth');

router.use('/auth', auth);

module.exports = router;