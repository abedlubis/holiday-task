var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
var {userAuth, adminAuth} = require('../middlewares/index')

/* GET users listing. */
router.get('/', userAuth, adminAuth, userController.findAll);
router.get('/point', userAuth, userController.getPoint);
router.get('/:id', userAuth, userController.findOne);


module.exports = router;
