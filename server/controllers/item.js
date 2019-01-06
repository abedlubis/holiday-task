var Item = require('../models/item');

module.exports = {
    create : function(req, res){
        var input = {name, price, stock} = req.body;
        Item.create(input, function(err, item){
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(item);
            }
        })
    },
    update : function(req, res){
        var input = {name, price, stock} = req.body;
        for (const key in input) {
            if (input.hasOwnProperty(key) == undefined) {
                delete input[key];
            }
        }
        
        Item.findOneAndUpdate({_id : req.params.id}, input, {new : true}, function(err, item){
            if(err){
                res.status(400).json(err);
            }else{
                if(item){
                    res.status(201).json({msg : "Item successfully updateed", item : item});
                }else{
                    res.status(404).json("Item not found");
                }
            }
        })
    },
    delete : function(req, res){
        Item.findOneAndDelete({_id : req.params.id}, function(err, item){
            if(err){
                res.status(400).json(err);
            }else{
                if(item){
                    res.status(201).json({msg : "Item successfully deleted"});
                }else{
                    res.status(404).json("Item not found");
                }
            }
        })
    },
    findAll : function(req, res){
        Item.find({type : 'price'}, function(err,items){      
            if(err){
                res.status(400).json(err);
            }else{
                if(items == ''){
                    res.status(404).json("There's no item yet");
                }else{
                    res.status(200).json(items);
                }
            }
        })
    },
    findOne : function(req, res){
        Item.findById({_id : req.params.id}, function(err, item){
            if(err){
                res.status(400).json(err);
            }else{
                if(item){
                    res.status(200).json(item);
                }else{
                    res.status(404).json("Item Not Found");
                }
            }
        })
    }
}