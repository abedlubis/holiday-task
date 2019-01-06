var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transaction')
var {userAuth, adminAuth} = require('../middlewares/index')

/* GET home page. */
router.post('/', userAuth, transactionController.create);
router.delete('/:id', userAuth, transactionController.delete)

module.exports = router;
