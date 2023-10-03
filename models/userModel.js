var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var user = new Schema({
    "username": {type: String,
        required: true}, 
    "gender":String,
    "password":String
    
});
module.exports = mongoose.model('users', user);
