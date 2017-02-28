var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;

var WishListItemSchema   = new Schema({
	shopperCrn : String,
	shopperId : String,
    itemBarcode : String,
    itemName: String,
    itemDescription : String,
    itemImageUrl : String,
    itemPrice : String,
    itemCurrency : String,
    itemStatus : String,
    itemShipping : String
});

module.exports = mongoose.model('WishListItem', WishListItemSchema);