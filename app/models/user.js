const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: String,
    password: String
});

schema.statics.create = function (username, password, callback) {
    const user = new this({
        username: username,
        password: password
    });

    user.save(callback);
};

module.exports = mongoose.model('user', schema);