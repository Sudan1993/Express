var express = require('express');
var methods = require("../token_auth");
var router = express.Router();

router.get('/',methods.ensureToken, (req, res, next) => {
 res.send("passed authenticateToken");
});

var order_controller = require('../controllers/order');

router.get('/getAllOrders',methods.ensureToken, order_controller.orders_list);
router.get('/entireOrder', methods.ensureToken, order_controller.orders_list_all);

router.post('/create',methods.ensureToken,  order_controller.order_create);

router.get('/:id',methods.ensureToken,  order_controller.order_details);

router.put('/:id/update',methods.ensureToken,  order_controller.order_update);

router.delete('/:id/delete',methods.ensureToken,  order_controller.order_delete);

module.exports = router;