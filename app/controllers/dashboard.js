const express = require('express');
const router = express.Router();

const Mindmap = require('../models/mindmap');

router.get('/', function (req, res) {
    Mindmap.find({
        owener: req.user._id
    }, function (err, minemaps) {
        if (err) {
            console.error("Failed to find mindmap. owener: " + req.user._id);
            return;
        }

        res.render('layouts/dashboard', {
            mindmaps: minemaps
        });
    });
});

module.exports = router;