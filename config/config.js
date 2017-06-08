const passport = require('./passport/passport');

module.exports = {
    mongodb: {
        url: "mongodb://localhost/mindmapjs"
    },
    configure: function () {
        passport();
    }
};