import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Roles page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-roles',
  templateUrl: 'roles.html'
})
export class RolesPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolesPage');
  }
home()
  {
    this.nav.setRoot(LimsAdminComponent);

  }
}
