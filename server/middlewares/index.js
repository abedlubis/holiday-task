var jwt = require('jsonwebtoken');
var {verifyToken} = require('../helpers/index');
var User = require('../models/user');
module.exports = {
    userAuth : function(req, res, next) {
        var {id, role} =  verifyToken(req.headers.token);
        User.findOne({_id : id}, function(err, user){
            if(err){
                res.status(400).json(err);
            }else{
                if(user){
                    req.userId = id;
                    req.role = role;
                    next();
                }else{
                    res.status(404).json("Invalid token, User Not Found");
                }
            }
        })
    },
    adminAuth : function(req, res, next) {
        if(req.role == 'admin') {
            next();
        }else{
            res.status(401).json('Error Authentication, you are not admin');
        }
    }
}