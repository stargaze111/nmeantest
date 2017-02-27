var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;

var CartSchema   = new Schema({
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

module.exports = mongoose.model('Cart', CartSchema);