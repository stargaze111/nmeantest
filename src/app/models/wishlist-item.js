var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;

var WishListItemSchema   = new Schema({
	wishListId : String,
	shopperCrn : String,
	shopperId : String,
    barcode : String,
    name: String,
    description : String,
    thumb : String,
    price : String,
    currency : String,
    status : String
});

module.exports = mongoose.model('WishListItem', WishListItemSchema);