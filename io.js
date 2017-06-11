function onConnection(socket) {
    socket.on('disconnect', function () {
        console.log("on disconnect");
    });
    console.log("onConnection");
}

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', onConnection);
};