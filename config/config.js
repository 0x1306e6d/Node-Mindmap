const passport = require('./passport/passport');

module.exports = {
    configure: function () {
        passport();
    }
};