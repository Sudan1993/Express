var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var OrderSchema = new Schema({
    prodname: {type: String, required: true},
    quantity: {type: Number, default:1},
    price: {type: Number , default:100},
    user: {
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'User'
    }
});


// Export the model
module.exports = mongoose.model('Order', OrderSchema);