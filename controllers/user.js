var User = require('../models/user');

const jwt = require('jsonwebtoken');

exports.user_create = function (req, res) {
    var user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            isadmin: req.body.isadmin,
            order: req.body.order
        }
    );

    user.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send('user Created successfully');
    })
};

exports.user_login = function(req,res){
     var username = req.body.username;
     var password = req.body.password;
    if (username.length > 0 && password.length > 0) {
         data = {
             username: username,
             password: password
         };
     }
     else {
         res.json({
             status: 0,
             message: "Provide valid input"
         });
     }
    
    User.findOne(data, function(err, user) {
         if (err) {
             res.json({
                 status: 0,
                 message: err
             });
         }
         if (!user) {
             res.json({
                 status: 0,
                 msg: "not found"
             });
         }
         else{
            const JWTToken = jwt.sign({
                username: user.username,
                id: user._id
              },
              'secret',
               {
                 expiresIn: '5h'
               });
               return res.status(200).json({
                 success: 'Welcome to the JWT Auth',
                 isadmin: user.isadmin,
                 token: JWTToken,
                 message: "Authenticated Successfully"
               });
         }
     })
};

exports.user_lists = function(req, res){
    console.log("inside user lists:::" + req.username);
    User.find({}, function(err, users) {
        //console.log(users);
        if(err) return next(err);
    var userMap = {};

    users.forEach(function(user) {
      userMap[user.id] = user;
    });
    //console.log(userMap);
    res.send(userMap);  
  });
};

exports.findById = function(userid) {
    console.log("userId" , userid)
    return new Promise(function (resolve, reject) {
        User.findById(userid,function (err, user) {
            if (err) resolve(err);
            else{console.log("else user" , user); resolve(user)};
        })
    });
};

exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) res.send(err);
        res.send(user);
    })
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return res.send(err);
        res.send('user udpated.');
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err);
        res.send('Deleted successfully!');
    })
};