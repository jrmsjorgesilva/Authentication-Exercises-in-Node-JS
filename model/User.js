const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 6,             //6 caracthers maximum
        min: 6              //6 caracthers minimum
    },
    email: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//MODEL TO SEND TO DATABASE
module.exports = mongoose.model('User', userSchema);
