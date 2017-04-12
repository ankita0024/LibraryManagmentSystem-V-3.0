import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdalService } from 'ng2-adal/services/adal.service';
import { GetRequestedBooks } from './../../providers/getRequestedBooks.service';
/*
  Generated class for the BooksRequested page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-books-requested',
  templateUrl: 'books-requested.html'
})
export class BooksRequestedPage {
  book: any = [];
  // decline:any=[];
  constructor(public nav: NavController, public navParams: NavParams, public adalService: AdalService, private getRequestedBooks: GetRequestedBooks) { }

  home() {
    this.nav.setRoot(LimsAdminComponent);
  }
  getRequestedBook() {
    console.log('inside service getallbooks---1');
    this.getRequestedBooks.getRequestedBooks().subscribe(
      data => {
        this.book = data
        console.log(this.book);
      },
      error => console.log(error)
    );
  }
  issueBook(mid,isbn) {
   var date = new Date();
                var today = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
                var r;
                if ((date.getMonth() + 1) == 12 && date.getDate() > 21) {
                    r = new Date(date.getFullYear(), 12 - date.getMonth() + 2, date.getDate() + 10);
                }
                else {
                    r = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() + 10);
                }
                var issueDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
                var dueDate = r.getFullYear() + '-' + r.getMonth() + '-' + r.getDate();

    console.log('inside service issue book',mid,isbn,issueDate,dueDate);
    this.getRequestedBooks.issueBook(mid,isbn,issueDate,dueDate).subscribe(
      res => {
        let issue= JSON.stringify(res)
        console.log(issue);
        this.getRequestedBook()
      },
      error => console.log(error)
    );
  }

  declineBook(mid,isbn) {
    console.log('inside service declinebooks',mid,isbn);
    this.getRequestedBooks.declineBook(mid,isbn).subscribe(
      res => {
        let decline= JSON.stringify(res)
        console.log(decline);
        this.getRequestedBook()
      },
      error => console.log(error)
    );
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksRequestedPage');
    this.getRequestedBook()
  }

}
