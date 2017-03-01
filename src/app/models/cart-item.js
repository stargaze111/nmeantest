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
    wishlist : String
});


CartItemSchema.path('itemBarcode').validate(function (value, respond) {
    User.findOne({ itemBarcode: value, itemSummaryStatus : 'ACTIVE' }, function (err, user) {
        if(user) respond(false);
    });
}, 'The item is already scanned');


module.exports = mongoose.model('CartItem', CartItemSchema);