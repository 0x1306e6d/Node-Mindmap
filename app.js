const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const http = require('http');

const config = require('./config/config');
const controller = require('./app/controllers/index');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(controller);

config.configure();

mongoose.connect(config.mongodb.url);
mongoose.connection.on('error', console.error.bind(console, "mongoose Error : "));

var port = process.env.PORT || 3000;
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