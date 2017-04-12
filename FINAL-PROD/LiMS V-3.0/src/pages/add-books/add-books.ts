import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { BarcodeService } from './../../providers/barcode.service';
import { AdalService } from 'ng2-adal/services/adal.service';
/*
  Generated class for the AddBooks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-books',
  templateUrl: 'add-books.html'
})
export class AddBooksPage {
  results: any;
  token;
  constructor(public nav: NavController, public navParams: NavParams, private barcodeservice: BarcodeService, public adalService: AdalService) {
    this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
  }
  showDetails: boolean;
  isbn;
  copies;
  author;
  image;
  publisher;
  book: any = [];
  title;
  trying;
  dropdown;
  noDetails:boolean;
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBooksPage');
  }
  home() {
    this.nav.setRoot(LimsAdminComponent);
  }
  scanBook() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.results = barcodeData;
    }, (err) => {
      alert(`error : ${err}`);
    });
  }
  //   addBook(myObj) {
  //  console.log(myObj.isbn);
  //     this.isbn = myObj.isbn;
  //    this.showDetails=true;
  //     this.barcodeservive.getBarcodeDetails(this.isbn, this.token).subscribe(
  //       data => {
  //         this.book = data
  //         console.log(this.book);
  //         console.log('-------->',this.book);
  //         console.log('Title is',this.book.items[0].volumeInfo.title);
  //         console.log('Title is',this.book.items[0].volumeInfo.authors[0]);
  //         console.log('Title is',this.book.items[0].volumeInfo.publisher);
  //         this.title=this.book.items[0].volumeInfo.title;
  //         this.author=this.book.items[0].volumeInfo.authors[0];
  //         this.publisher=this.book.items[0].volumeInfo.publisher;
  //       },
  //       error => console.log(error)
  //     );
  //   }
  addBook(isbn) {
    this.isbn = isbn;
    this.showDetails = false;
    this.noDetails=false;
    this.barcodeservice.getBarcodeDetails(this.isbn, this.token).subscribe(
      data => {
        this.book = data
        console.log(this.book);
        if(this.book.totalItems===1)
        {
        this.showDetails = true;
         console.log('-------->', this.book);
        console.log('Title is', this.book.items[0].volumeInfo.title);
        console.log('Title is', this.book.items[0].volumeInfo.authors[0]);
        console.log('Title is', this.book.items[0].volumeInfo.publisher);
        console.log('Title is', this.book.items[0].volumeInfo.imageLinks.thumbnail);
        this.title = this.book.items[0].volumeInfo.title;
        this.author = this.book.items[0].volumeInfo.authors[0];
        this.publisher = this.book.items[0].volumeInfo.publisher;
        this.image = this.book.items[0].volumeInfo.imageLinks.thumbnail;
      }
      else{
        this.noDetails=true;
      }
       
      },
      error => console.log(error)
    );
  }
  addNewBook(obj,abc) {
    this.copies = obj.copies;
    this.dropdown = obj.dropdown;
    console.log('obj---->', obj);
    console.log('copies------>', this.copies);
    console.log('genre------>', this.dropdown);
    
    var obj: any = {
      "isbn": this.isbn,
      "bookId": [],
      "title": this.title,
      "authors": this.author,
      "price": 0,
      "publisher": this.publisher,
      "yearOfPublishing": "",
      "edition": "",
      "numberOfCopies": this.copies,
      "genre": this.dropdown,
      "description": "",
      "issueDetails": [],
      "reviews": [],
      "avgRating": 0,
    }
    console.log('object------>',obj);
    this.barcodeservice.addNewBook(obj, this.token).subscribe(
      data => {
        console.log(data)
      },
      error => console.log(error)
    );
  }

}
