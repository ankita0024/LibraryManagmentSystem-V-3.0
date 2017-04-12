var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishListSchema = new Schema({
    mId: String,
    name: String,
    role: String,
    emailId: String,
    contactNo: String,
    issueDetails: [{
        bookId: String,
        issueDate: String,
        dueDate: String
    }],
    interestedGenre: Array,
    requestedBookDetails: Array,
    favoriteAuthors: Array,
    wishList: Array
}, { collection: 'usersDB' });

module.exports = mongoose.model('WishList', wishListSchema);