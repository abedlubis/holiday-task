var express = require('express');
var router = express.Router();
var itemController = require('../controllers/item')
var {userAuth, adminAuth} = require('../middlewares/index')

/* GET home page. */
router.get('/', userAuth, itemController.findAll);
router.get('/:id', userAuth, itemController.findOne);
router.post('/', userAuth, adminAuth, itemController.create);
router.put('/:id', userAuth, adminAuth, itemController.update);
router.delete('/:id', userAuth, adminAuth, itemController.delete);

module.exports = router;
