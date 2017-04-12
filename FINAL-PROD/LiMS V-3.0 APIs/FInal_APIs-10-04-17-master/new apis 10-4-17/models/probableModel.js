var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var probableModelSchema = new Schema({
    mId: String,
    name: String
}, { collection: 'probableAdmins' });

module.exports = mongoose.model('ProbableModel', probableModelSchema);