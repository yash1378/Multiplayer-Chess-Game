const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    phone:String
})

const User = mongoose.model('playersdata',userSchema);

module.exports = User;