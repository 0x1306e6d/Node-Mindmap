const express = require('express');
const router = express.Router();

const auth = require('./auth');
const dashboard = require('./dashboard');
const mindmap = require('./mindmap');

router.use('/auth', auth);

router.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/signin');
    }
});
router.use('/', dashboard);
router.use('/mindmap', mindmap);

module.exports = router;