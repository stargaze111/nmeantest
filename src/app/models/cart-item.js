var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;

var CartItemSchema   = new Schema({
	cartId : String,
	shopperCrn : String,
	shopperId : String,
    itemBarcode : String,
    itemName: String,
    itemDescription : String,
    itemImageUrl : String,
    itemPrice : String,
    itemCurrency : String,
    itemStatus : String
});

module.exports = mongoose.model('CartItem', CartItemSchema);