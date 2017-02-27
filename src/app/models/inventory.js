var mongoose     = require('mongoose');


var Schema       = mongoose.Schema;

var InventorySchema   = new Schema({
    itemBarcode : String,
    itemName: String,
    itemDescription : String,
    itemImageUrl : String,
    itemPrice : String,
    itemCurrency : String
});

module.exports = mongoose.model('Inventory', InventorySchema);