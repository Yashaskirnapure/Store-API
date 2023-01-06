const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const item = new Schema({
    itemName : {
        type : String,
        required : [true, "please provide item name"],
        maxLength : [20, "item name should not be more than 20"],
        trim : true
    }
});

const Item = mongoose.model('Item', item);
module.exports = {Item};