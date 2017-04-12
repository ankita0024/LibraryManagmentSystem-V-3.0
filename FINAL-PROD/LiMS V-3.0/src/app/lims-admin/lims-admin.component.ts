import { ReportsPage } from './../../pages/reports/reports';
import { AddBooksPage } from './../../pages/add-books/add-books';
import { TransferAdminPage } from './../../pages/transfer-admin/transfer-admin';
import { ApprovalsPage } from './../../pages/approvals/approvals';
import { RolesPage } from './../../pages/roles/roles';
import { ListPage } from './../../pages/list/list';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdalService } from 'ng2-adal/services/adal.service';

@Component({
  selector: 'app-lims-admin',
  templateUrl: './lims-admin.component.html'
})
export class LimsAdminComponent  {
  name;

  constructor(public nav: NavController, public adalService:AdalService) { 
    this.name = this.adalService.userInfo.profile.name;
  }
 listOfBooks()
  {
    this.nav.push(ListPage);
  }
  roles()
  {
    this.nav.push(RolesPage);
  }
  approvals()
  {
    this.nav.push(ApprovalsPage);
  }
  transferAdmin()
  {
    this.nav.push(TransferAdminPage);
  }
  addBooks()
  {
    this.nav.push(AddBooksPage);
  }
  public logOut() {
    this.adalService.logOut();
  }

reports()
{
  this.nav.push(ReportsPage);
}
 

}
