var mongoose     = require('mongoose');


mongoose.connect('mongodb://heroku_k8bk6pcl:2qrvt46ca4ol77cog511lhp00v@ds157469.mlab.com:57469/heroku_k8bk6pcl');
mongoose.set('debug', true); // turn on debug

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
SampleSchema.plugin(sequenceGenerator, {
    field: 'code',
    startAt: '99-ZX',
    prefix: 'MNH-',
    maxSaveRetries: 2
});

//activate id generator plugin
ShopperSchema.plugin(sequenceGenerator, {
    field: 'crn',
    startAt: '99-ZX',
    prefix: 'SHP-',
    maxSaveRetries: 2
});

module.exports = mongoose.model('ShopperSchema', ShopperSchema);