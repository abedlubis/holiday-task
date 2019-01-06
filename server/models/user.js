const mongoose = require('mongoose');
var {hashPassword} = require('../helpers/index')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'Email required']
    },
    password : {
        type : String,
        required : [true, 'Password required'],
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    gender : {
        type : String, 
    },
    phone : {
        type : String,
    },
    role : {
        type : String,
    },
    point : {
        type : Number,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

userSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User;
