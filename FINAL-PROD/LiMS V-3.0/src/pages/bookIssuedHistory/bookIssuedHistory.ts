import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdalService } from 'ng2-adal/services/adal.service';
import { GetReportsService } from './../../providers/reports.service';

@Component({
templateUrl:'bookIssuedHistory.html'
})
export class BookIssuedHistory{
constructor(public nav: NavController, public navParams: NavParams, public adalService: AdalService, private getReportsService: GetReportsService) {

}
book;
getBooksToBeReturned(){
    console.log('inside service getallbooks---1');
    this.getReportsService.getToBeReturnedHistory().subscribe(
      data => {
        this.book = data
        console.log(this.book);
      },
      error => console.log(error)
    );
  
}

home()
  {
    this.nav.setRoot(LimsAdminComponent);

  }
  ngOnInit(){
    this.getBooksToBeReturned()
  }
}