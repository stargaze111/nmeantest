var mongoose     = require('mongoose');

mongoose.connect('mongodb://root:root123@localhost:27017/test',{auth:{authdb:"admin"}});


mongoose.set('debug', true); // turn on debug

var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);