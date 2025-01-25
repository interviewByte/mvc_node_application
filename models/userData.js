const mongoose = require('mongoose');

const userData = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
const userModel = mongoose.model('userRelatedData',userData);
module.exports = userModel