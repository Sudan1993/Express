var mongoose = require('mongoose');
var Order = require('../models/order');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, max: 100, required: true},
    password: {type: String, require:true ,  required:true},
    isadmin:{type: Boolean, required: true},
    orders: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Order'
    }]
});


// Export the model
module.exports = mongoose.model('User', UserSchema);