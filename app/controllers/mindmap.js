const express = require('express');
const router = express.Router();

const Mindmap = require('../models/mindmap');

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Mindmap.findOne({
        _id: id,
        owener: req.user._id
    }, function (err, mindmap) {
        if (err) {
            console.error("Failed to find mindmap. id: " + id);
            return;
        }

        res.render('layouts/mindmap', {
            mindmap: mindmap
        });
    });
});

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