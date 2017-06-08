const passport = require('passport');

const localSignIn = require('./local/signin');
const localSignUp = require('./local/signup');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('local-signin', localSignIn);
    passport.use('local-signup', localSignUp);
};