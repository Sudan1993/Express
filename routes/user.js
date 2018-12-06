var express = require('express');
var methods = require("../token_auth");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require('../controllers/user');

router.get('/',methods.ensureToken, (req, res, next) => {
 res.send("passed authenticateToken");
});

router.post('/login', user_controller.user_login);

router.get('/getAllUsers',methods.ensureToken, user_controller.user_lists);

router.post('/create',user_controller.user_create);

router.get('/:id', methods.ensureToken, user_controller.user_details);

router.put('/:id/update',methods.ensureToken,  user_controller.user_update);

router.delete('/:id/delete', methods.ensureToken, user_controller.user_delete);


module.exports = router;