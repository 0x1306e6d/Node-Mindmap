const express = require('express');
const router = express.Router();

const Mindmap = require('../models/mindmap');

router.post('/', function (req, res) {
    var title = req.body.title;
    Mindmap.create(req.user._id, title, function (err, mindmap) {
        if (err) {
            console.error("Failed to create mindmap. title: " + title);
            return;
        }

        res.redirect('/');
    });
});

module.exports = router;