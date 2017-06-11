function load(id) {
    var socket = io();
    socket.on('nodes', onNodes);

    socket.emit('nodes', id);
}

function onNodes(data) {
    console.log("onNodes data: " + JSON.stringify(data));
}