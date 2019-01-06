var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');

module.exports = {
    hashPassword : function(params){
        return bcrypt.hashSync(params, salt);
    },
    compareSync : function(params){
        return bcrypt.compareSync(params.password, params.hash);
    },
    signToken : function(params){
        return jwt.sign(params, process.env.secret);
    },
    verifyToken : function(params){
        return jwt.verify(params, process.env.secret)
    }
}