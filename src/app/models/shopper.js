var mongoose     = require('mongoose');


var sequenceGenerator = require('mongoose-sequence-plugin');

var Schema       = mongoose.Schema;

var ShopperSchema   = new Schema({
    firstName : String,
    lastName: String,
    email : String,
    mobilePhone : String,
    password : String,
    gender : String,
    address : String,
    crn : String
});


//activate id generator plugin
ShopperSchema.plugin(sequenceGenerator, {
    field: 'crn',
    startAt: '99-ZX',
    prefix: 'SHP-',
    maxSaveRetries: 2
});

module.exports = mongoose.model('ShopperSchema', ShopperSchema);