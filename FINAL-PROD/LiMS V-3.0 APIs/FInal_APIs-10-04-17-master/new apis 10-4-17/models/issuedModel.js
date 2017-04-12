var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issuedModelSchema = new Schema({
    bookId: String,
    mId: String,
    issueDate: String,
    dueDate: String,
    isRenewable: Boolean,
    image: String,
    title: String,
    returnRequest: Boolean
}, { collection: 'issuedBooksDB' });

module.exports = mongoose.model('IssuedBooks', issuedModelSchema);