import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import{GetRequestedBooks} from './../../providers/getRequestedBooks.service';

/*
  Generated class for the BooksReturned page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-books-returned',
  templateUrl: 'books-returned.html'
})
export class BooksReturnedPage {
  book;
  constructor(public nav: NavController, public navParams: NavParams,private getRequestedBooks:GetRequestedBooks) {}

 
  getRequestedBook() {
    console.log('inside service getallbooks');
    this.getRequestedBooks.getReturnRequestedBooks().subscribe(
      data => {
        this.book = data
        console.log(this.book);
      },
      error => console.log(error)
    );
  }
  returnBook(mId,bookId) {
    console.log('inside service return book',mId,bookId);
    this.getRequestedBooks.acceptReturn(mId,bookId).subscribe(
      res => {
        let decline= JSON.stringify(res)
        console.log(decline);
        this.getRequestedBook()
      },
      error => console.log(error)
    );
  }
home()
  {
    this.nav.setRoot(LimsAdminComponent);

  }
 ionViewDidLoad() {
    console.log('ionViewDidLoad BooksReturnedPage');
    this.getRequestedBook()
  }
}