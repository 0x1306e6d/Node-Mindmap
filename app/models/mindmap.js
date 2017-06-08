const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    owener: mongoose.Schema.ObjectId,
    title: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
});

schema.statics.create = function (owener, title, callback) {
    const mindmap = new this({
        owener: owener,
        title: title
    });
    mindmap.save(callback);
};

module.exports = mongoose.model('mindmap', schema);