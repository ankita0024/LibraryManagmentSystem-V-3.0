var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var aad = require('azure-ad-jwt');
var lims = require('./routes/lims');

var db = mongoose.connect('webtechdevops.centralindia.cloudapp.azure.com:51003/lims');

var app = express();
var NewLimsModel = require('./models/newlimsModel');

var port = process.env.port || 9890;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

//lims2.0 apis route
app.use('/lims', lims);




app.post('/addNewBook', function (req, res) {
    
    console.log("In api.........",req.body);
    var myObj = {
      "isbn": req.body.isbn || null,
      "bookId": [],
      "title": req.body.title || null,
      "authors": req.body.author || null,
      "price": 0,
      "publisher": req.body.publisher || null,
      "yearOfPublication": "",
      "edition": "",
      "available": 0,
      "numberOfCopies": req.body.copies || null,
      "genre": req.body.selectedValue || null,
      "description": "",
      "issueDetails": [],
      "reviews": [],
      "avgRating": 0,
      "likes":0,
      "image":req.body.image
    }
    console.log("MyObj......",myObj);
    var data = new NewLimsModel(myObj);
    data.save();
    res.send("In API Successssssssss");
   
});





app.listen(port, function () {
    console.log('running on port: ' + port);
});