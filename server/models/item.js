const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name : {
        type : String
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number
    },
    type: {
        type : String,
        required : true
    }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;