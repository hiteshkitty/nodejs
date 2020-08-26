var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    } , 
    password: {
        type: String,
        required: true,
        unique: true
    },
    admin:
    {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);