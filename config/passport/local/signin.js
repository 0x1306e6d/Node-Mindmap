const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../app/models/user');

module.exports = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findOne({
            username: username,
            password: password
        }, function (err, user) {
            if (err) {
                console.error("Failed to fine user. username=" + username, err);
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('signin', "Invalid username of password"));
            }

            return done(null, user);
        });
    }
);