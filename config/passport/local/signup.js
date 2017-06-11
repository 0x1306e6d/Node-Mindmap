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
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('signup', "Username " + username + " is already exist"));
            }

            User.create(username, password, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('signup', "Sign up is failed"));
                }
                return done(null, user);
            });
        });
    }
);