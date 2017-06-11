const Mindmap = require('./app/models/mindmap');

function onConnection(socket) {
    socket.on('disconnect', function () {

    });

    socket.on('nodes', function (id) {
        Mindmap.findOne({
            _id: id
        }, function (err, mindmap) {
            if (err) {
                console.error("Failed to find mindmap. id: " + id);
                return;
            }

            socket.emit('nodes', mindmap.nodes);
        });
    });

    socket.on('add-node', function (_id, arg) {
        var name = arg.name;
        var parent = arg.parent;

        Mindmap.findOne({
            _id: _id
        }, function (err, mindmap) {
            if (err) {
                console.error("Failed to find mindmap. id: " + _id);
                return;
            }
            mindmap.addNode(name, parent, function (err, mindmap) {
                if (err) {
                    console.error("Failed to add node.", err);
                } else {
                    socket.emit('nodes', mindmap.nodes);
                }
            });
        });
    });

    socket.on('edit-node', function (_id, arg) {
        var id = arg.id;
        var name = arg.name;

        Mindmap.findOne({
            _id: _id
        }, function (err, mindmap) {
            if (err) {
                console.error("Failed to find mindmap. id: " + _id);
                return;
            }
            mindmap.editNode(id, name, function (err, mindmap) {
                if (err) {
                    console.error("Failed to edit node.", err);
                } else {
                    socket.emit('nodes', mindmap.nodes);
                }
            });
        });
    });
}

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', onConnection);
};