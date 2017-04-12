var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var limsDataSchema = new Schema({
    isbn: String,
    bookId: Array,
    title: String,
    authors: String,
    price: String,
    publisher: String,
    yearOfPublication: String,
    edition: String,
    numberOfCopies: Number,
    available: Number,
    genre: Array,
    description: String,
    issueDetails: [{
        bookId: String,
        mId: String,
        issueDate: String,
        dueDate: String,
        isRenewable: Boolean,
        image: String,
        title: String,
        returnRequest: String
    }],
    reviews: Array,
    avgRating: Number,
    likes: Number,
    image: String
}, { collection: 'booksDB' });

module.exports = mongoose.model('NewLimsModel', limsDataSchema);