var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index')
var {userAuth} = require('../middlewares/index')

/* GET home page. */
router.post('/register', indexController.register);
router.post('/login', indexController.login);
router.put('/:id', userAuth, indexController.update);
router.delete('/:id', userAuth, indexController.delete);

module.exports = router;
