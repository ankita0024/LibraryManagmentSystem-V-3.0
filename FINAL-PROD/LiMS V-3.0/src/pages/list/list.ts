import { Search } from './../../providers/search.service';
import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  book: any[];
  constructor(public navParams: NavParams, public nav: NavController, private search: Search) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  home() {
    this.nav.setRoot(LimsAdminComponent);
  }

  getAllBooks() {
    console.log('inside service getallbooks');
    this.search.getAllBook().subscribe(
      data => {
        this.book = data
        console.log(this.book);
      },
      error => console.log(error)
    );
  }
  ngOnInit() {
    this.getAllBooks();
  }
}