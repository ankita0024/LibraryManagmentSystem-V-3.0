import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{BookIssuedHistory} from './../bookIssuedHistory/bookIssuedHistory';
import{BookReturnedHistory} from './../bookReturnedHistory/bookReturnedHistory';
/*  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }
home()
  {
    this.nav.setRoot(LimsAdminComponent);

  }
    booksIssuedHistory()
  {
    this.nav.push(BookIssuedHistory);
  }
  // listofbookreturned()
  // {
  //   this.nav.setRoot(BooksReturnedPage);
  // }
  booksReturnedHistory()
  {
    this.nav.push(BookReturnedHistory);
  }
}
