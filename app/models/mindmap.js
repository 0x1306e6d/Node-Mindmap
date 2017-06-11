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

schema.methods.addNode = function (name, parent, callback) {
    var node = findNode(this.nodes, parent);
    if (node) {
        node.children.push({
            id: uuid(),
            name: name,
            children: []
        });
        this.markModified('nodes');
        this.save(callback);
    } else {
        console.error("Failed to find node to add. id: " + id);
    }
};

schema.methods.editNode = function (id, name, callback) {
    var node = findNode(this.nodes, id);
    if (node) {
        node.name = name;
        this.markModified('nodes');
        this.save(callback);
    } else {
        console.error("Failed to find node to edit. id: " + id);
    }
};

function findNode(node, id) {
    if (node.id === id) {
        return node;
    } else {
        var len = node.children.length;
        for (var i = 0; i < len; i++) {
            var child = node.children[i];
            if (findNode(child, id)) {
                return child;
            }
        }
        return null;
    }
}

module.exports = mongoose.model('mindmap', schema);