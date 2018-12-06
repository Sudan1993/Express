var Order = require('../models/order');
var User = require('../controllers/user');

exports.order_create = function (req, res) {
    var userid = req.id;
    var username = req.username;
    //get the user
    var user = User.findById(userid);
    //(User.findById(userid)).then((user,err)=>{
    user.then((user,err)=>{
        console.log("user fom findById" , user);
        if(err) res.send(err);
        else {
                var order = new Order(
                    {
                        prodname: req.body.prodname,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        user: userid                
                    }
                );
                console.log("order ===== ", order);
                order.save(function (err) {
                    if (err) {
                        return res.send(err);
                    }
                    user.orders.push(order);
                    user.save(function(err){
                        if(err) res.sendStatus(403);
                        else res.send("order created successfully");
                    })
            })
        }
        
    });    
    
};

exports.orders_list_all = function(req, res){
    var userid = req.id;
    var user = User.findById(userid);
    user.then((user,err)=>{
        //res.send(typeof user)
        if(user["isadmin"]){
            Order.find({}).
              exec(function (err, orders) {
                if (err) res.send(err);
                console.log(orders);
                res.send(orders);
              });
        }
        else{
            res.send("User doesnt have admin privileges");
        }
    })
};


exports.orders_list = function(req, res){
    var userid = req.id;
    Order.find({user : userid}).
      exec(function (err, orders) {
        if (err) return handleError(err);
        console.log(orders);
        res.send(orders);
      });
}

exports.order_details = function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) return err;
        res.send(order);
    })
};

exports.order_update = function (req, res) {
    Order.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, order) {
        if (err) return next(err);
        res.send('order udpated.');
    });
};

exports.order_delete = function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })  
};