var mongoose  = require('mongoose');
var User = require('../models/user')
var Schema = mongoose.Schema

var tranSchema = new Schema ({
    items : [{
        item : { type: Schema.Types.ObjectId, ref: 'Item' },
        quantity :  Number,
        subtotal : Number,
        point : Number
    }],
    user : { type: Schema.Types.ObjectId, ref: 'Transaction' },
    quantity : Number,
    totalPrice : Number
})

tranSchema.post('save', function(doc){
    var countQuantity = 0,
        countPoint = 0,
        countTotal = 0;
    doc.items.forEach(item => {
        countQuantity = countQuantity + item.quantity;
        countTotal = countTotal + item.subtotal;
        countPoint = countPoint + item.point;
    });
    User.findOneAndUpdate({_id : doc.user}, {point : countPoint}, {new : true, upsert : true}, function( err){
        if(err) throw new Error(err.message)
    })
    doc.quantity = countQuantity;
    doc.totalPrice = countTotal;
})

tranSchema.post('findOneAndUpdate', function(doc){
    var countQuantity = 0,
        countPoint = 0,
        countTotal = 0;
    doc.items.forEach(item => {
        countQuantity = countQuantity + item.quantity;
        countTotal = countTotal + item.subtotal;
        countPoint = countPoint  + item.point;
    });
    User.findOneAndUpdate({_id : doc.user}, {point : countPoint}, {new : true, upsert : true}, function(err){
        if(err) throw new Error(err.message)
    })
    doc.quantity = countQuantity;
    doc.totalPrice = countTotal;

})

var Transaction = mongoose.model('Transaction', tranSchema);
module.exports = Transaction;