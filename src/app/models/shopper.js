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
    startAt: '10000000000000000000',
    prefix: '',
    maxSaveRetries: 2
});


ShopperSchema.path('email').validate(function (value, respond) {
    mongoose.model('Shopper').findOne({ email: value }, function (err, user) {
        if(user) {
			respond(false);
        }else{
			respond(true);
		}
    });
}, 'Email address is already registered');

module.exports = mongoose.model('Shopper', ShopperSchema);