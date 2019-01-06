const User = require('../models/user');
const Item = require('../models/item');
const {signToken, compareSync} = require('../helpers/index');

module.exports = {
    findAll : function(req, res) {
        User.find({}, function(err,users){      
            if(err){
                res.status(400).json(err);
            }else{
                if(users == ''){
                    res.status(404).json("There's no user yet");
                }else{
                    res.status(200).json(users);
                }
            }
        })
    },
    findOne : function(req, res){
        let id = req.userId
        User.findById(req.params.id, function(err, user){
            if(err){
                res.status(400).json(err)
            }else{
                if(user){
                    res.status(200).json(user)
                }else{
                    res.status(404).json("User Not Found");
                }
            }
        })
    },
    getPoint : function(req, res){
        let id = req.userId
        User.findById(req.userId, function(err, user){
            if(err){
                res.status(400).json(err)
            }else{
                if(user){
                    let point = user.point
                    Item.find({type : 'point', price: {$lte : point}}, function(err, items){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json({point : point, itemRewards : items})
                        }
                    })
                }else{
                    res.status(404).json("User Not Found");
                }
            }
        })
    }
}