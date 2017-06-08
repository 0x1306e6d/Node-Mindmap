const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        console.log("[signin] username: " + username + ", password: " + password);

        done(null, {
            username: username,
            password: password
        });
    }
);