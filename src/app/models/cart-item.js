var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;


var CartItemSchema   = new Schema({
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



module.exports = mongoose.model('CartItem', CartItemSchema);


CartItemSchema.path('itemBarcode').validate(function (value, respond) {
    mongoose.model('CartItem').findOne({ itemBarcode: value, itemSummaryStatus : 'ACTIVE' }, function (err, cartItem) {
        if(cartItem) {
			respond(false);
        }else {
			respond(true);
		}
    });
}, 'The item is already scanned');
