import { BooksReturnedPage } from './../books-returned/books-returned';
import { BooksRequestedPage } from './../books-requested/books-requested';
import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Approvals page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-approvals',
  templateUrl: 'approvals.html'
})
export class ApprovalsPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

home()
  {
    this.nav.setRoot(LimsAdminComponent);
  }
  booksRequested()
  {
    this.nav.push(BooksRequestedPage);
  }
  // listofbookreturned()
  // {
  //   this.nav.setRoot(BooksReturnedPage);
  // }
  booksReturned()
  {
    this.nav.push(BooksReturnedPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovalsPage');
  }
}
