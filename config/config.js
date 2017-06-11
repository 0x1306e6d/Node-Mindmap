const passport = require('./passport/passport');

module.exports = {
    mongodb: {
        url: (process.env.MONGODB_URI || "mongodb://localhost/mindmapjs")
    },
    configure: function () {
        passport();
    }
};