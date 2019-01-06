var Transaction = require('../models/transaction')

module.exports = {
    create : function(req, res){
        var id = req.userId;
        Transaction.findOne({user : id}, function(err, transaction){
            if(err){
                res.status(400).json(err)
            }else{
                var items = {item, quantity} = req.body;
                items.subtotal = items.quantity * req.body.price
                items.point = Math.floor(items.subtotal / 100000)
                
                if(transaction){
                    Transaction.findOneAndUpdate({user : id}, {$push : {items : items}}, {new : true}, function(err, transaction){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json(transaction)
                        }
                    })
                }else{
                    var input = {items, user : id}
                    Transaction.create(input, function(err, transaction){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json(transaction)
                        }
                    })
                }
            }
        })
    },
    delete : function(req, res) {
        Transaction.findOne({user : req.userId}, function(err,transaction){
            if(err) {
                 res.status(400).json(err)
            }else{
                if(transaction){
                    if(transaction.user == req.userId || req.role == 'admin'){
                        Transaction.findOneAndUpdate({ 
                            user : req.userId 
                        }, {
                            $pull : { 
                                items : {
                                    _id : req.params.id 
                                } 
                            } 
                        }, function(err, result){
                            if(err) {
                                console.log(err, "==========")
                                res.status(400).json(err)
                            }else{
                                res.status(200).json("Item has been deleted from the transaction")
                            }
                        })
                    }else{
                        res.status(401).json('Error Authentication')
                    }
                }else{
                    res.status(404).json('Transaction Not Found');
                }
            }
        })
    }
}