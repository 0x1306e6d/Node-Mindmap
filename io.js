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
}

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', onConnection);
};