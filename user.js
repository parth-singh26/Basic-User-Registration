const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

let userSchema = mongoose.Schema({
    name: String,
    imageurl: String,
    password: String,
    email: String
});

module.exports = mongoose.model('user', userSchema)