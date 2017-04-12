var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var returnedModelSchema = new Schema({
    bookId: String,
    mId: String,
    returnedOn: String,
    image: String,
    title: String
}, { collection: 'returnedBooksDB' });

module.exports = mongoose.model('ReturnedBooks', returnedModelSchema);