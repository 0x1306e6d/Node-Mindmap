const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'resources')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mindmapjs',
    resave: false,
    saveUninitialized: true
}));

const controller = require('./app/controllers/index');
app.use(controller);

var port = process.env.PORT | 3000;
var server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function onListening() {
    console.log("Listening on " + server.address().port);
}

function onError(err) {
    if (err.syscall !== 'listen') {
        throw err;
    }

    switch (err.code) {
        case 'EACCES':
            console.error(port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw err;
    }
}