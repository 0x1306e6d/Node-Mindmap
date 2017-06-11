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

        res.redirect('/mindmap/' + mindmap._id);
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Mindmap.findById(id, function (err, mindmap) {
        if (err) {
            console.error("Failed to find mindmap. id: " + id);
        } else {
            res.render('layouts/mindmap', {
                mindmap: mindmap
            });
        }
    });
});

router.route('/:id/nodes')
    .get(function (req, res) {
        var id = req.params.id;
        Mindmap.findById(id, function (err, mindmap) {
            if (err) {
                console.error("Failed to find mindmap. id: " + id);
            } else {
                if (mindmap) {
                    res.json(mindmap.nodes);
                } else {
                    res.sendStatus(400);
                }
            }
        });
    })
    .post(function (req, res) {
        var _id = req.params.id;
        var _method = req.body._method;

        Mindmap.findById(_id, function (err, mindmap) {
            if (err) {
                console.error("Failed to find mindmap. id: " + _id);
            } else {
                if (mindmap) {
                    if (_method === 'add') {
                        var name = req.body.name;
                        var parent = req.body.parent;

                        mindmap.addNode(name, parent, function (err, mindmap) {
                            if (err) {
                                console.error("Failed to add node.", err);
                            } else {
                                res.redirect('/mindmap/' + _id);
                            }
                        });
                    } else if (_method === 'edit') {
                        var id = req.body.id;
                        var name = req.body.name;
                        mindmap.editNode(id, name, function (err, mindmap) {
                                if (err) {
                                    console.error("Failed to edit node.", err);
                                } else {
                                    res.redirect('/mindmap/' + _id);
                                }
                            });
                    } else if (_method === 'delete') {
                        var id = req.body.id;
                        mindmap.removeNode(id, function (err, mindmap) {
                                if (err) {
                                    console.error("Failed to edit node.", err);
                                } else {
                                    if (mindmap) {
                                        res.redirect('/mindmap/' + _id);
                                    } else {
                                        res.redirect('/');
                                    }
                                }
                            });
                    } else {
                        console.error("Unknown _method " + _method);
                    }
                } else {
                    res.sendStatus(400);
                }
            }
        });
    });

module.exports = router;