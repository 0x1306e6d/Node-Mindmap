const mongoose = require('mongoose');
const uuid = require('uuid/v4');

var schema = new mongoose.Schema({
    owener: mongoose.Schema.ObjectId,
    title: String,
    nodes: Object,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
});

schema.statics.create = function (owener, title, callback) {
    const mindmap = new this({
        owener: owener,
        title: title,
        nodes: {
            id: uuid(),
            name: title,
            children: []
        }
    });
    mindmap.save(callback);
};

module.exports = mongoose.model('mindmap', schema);