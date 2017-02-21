var mongoose     = require('mongoose');

mongoose.connect('mongodb://heroku_k8bk6pcl:2qrvt46ca4ol77cog511lhp00v@ds157469.mlab.com:57469/heroku_k8bk6pcl');


mongoose.set('debug', true); // turn on debug

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