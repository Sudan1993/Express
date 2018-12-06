// app.js

var express = require('express');
var bodyParser = require('body-parser');

var order = require('./routes/order'); // Imports routes for the orders
var user = require('./routes/user')
var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
//var dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/orderstutorial';
var dev_db_url  = 'mongodb://sudaraje:abcd1234@ds123834.mlab.com:23834/mongo';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/orders', order);
app.use('/users', user);

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
