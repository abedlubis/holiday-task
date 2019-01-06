const User = require('../models/user');
const {signToken, compareSync} = require('../helpers/index')

module.exports = {
    register : function(req, res){
        User.findOne({email : req.body.email}, function(err, user){
            if(err){
                res.status(400).json(err);
            }else{
                if(user){
                    res.status(400).json(" User Already Exist");
                }else{
                    var input = {email, password} = req.body;
                    User.create(input, function(err, user){
                        if(err){
                            res.status(400).json(err);
                        }else{
                            res.status(201).json(user);
                        }
                    })
                }
            }
        })
    },
    login : function(req, res){
        User.findOne({email : req.body.email}, function(err, user){
            if(err){
                res.status(400).json(err);
            }else{
                if(user){
                    if(compareSync({password : req.body.password, hash : user.password})){
                        var token = signToken({id : user._id, email : user.email, role : user.role});
                        res.status(200).json({token : token});
                    }else{
                        res.status(400).json("Password is wrong");
                    }
                }else{
                    res.status(404).json("User Not Found");
                }
            }
        })
    },
    update : function(req, res){
        var id = req.userId;
        var input = {email, password, firstName, lastName, gender, phone, updatedAt} = req.body;
        input.updatedAt = Date.now()
        for (const key in input) {
            if (input[key] == undefined) {
                delete input[key];
            }
        }
        console.log(input)
        if(id === req.params.id || req.role == 'admin'){
            User.findOneAndUpdate({_id : req.params.id}, input, {new : true}, function(err, user){
                if(err){
                    res.status(400).json(err);
                }else{
                    if(user){
                        res.status(200).json({msg : "User updated", user : user});
                    }else{
                        res.status(404).json("User Not Exist");
                    }
                }
            })
        }
        else{
            res.status(401).json("Error Authentication");
        }
    },
    delete : function(req,res){
        var id = req.userId;
        if(id === req.params.id){
            User.findOneAndDelete({_id : req.params.id}, function(err, success){
                if(err){
                    res.status(400).json(err);
                }else{
                    res.status(200).json({msg : "User deleted"});
                }
            })
        }
        else{
            res.status(401).json("Error Authentication");
        }
    }

}