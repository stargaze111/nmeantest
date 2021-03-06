var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;

var WishListItemSchema   = new Schema({
	shopperCrn : String,
	shopperId : String,
    itemBarcode : String,
    itemName: String,
    itemDescription : String,
    itemThumb : String,
    itemPrice : String,
    itemCurrency : String,
    itemStatus : String,
    itemShipping : String,
    itemSummaryStatus : String,
    wishList : String
});

module.exports = mongoose.model('WishListItem', WishListItemSchema);