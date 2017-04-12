import { LimsAdminComponent } from './../../app/lims-admin/lims-admin.component';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransferAdminService} from './../../providers/transferAdmin.service';
import { AdalService } from 'ng2-adal/services/adal.service';

/*
  Generated class for the TransferAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transfer-admin',
  templateUrl: 'transfer-admin.html'
})
export class TransferAdminPage {
  token;
  mid;
  try;
  name;
  admins;
  adminsName:any=[];
  l;
  constructor(public nav: NavController, public navParams: NavParams,private transferAdminService:TransferAdminService, public adalService: AdalService) {
    this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
    this.mid = this.adalService.userInfo.userName.substring(0, 8);
    this.name = this.adalService.userInfo.profile.name;
  }
  home()
  {
  this.nav.setRoot(LimsAdminComponent);
}
// app.route('/addnewbook/:isbn').get(function(req, res, next) {
//     console.log('in add');
//     WishList.create({ mId: req.params.isbn })
// });
save(admin){
  console.log(admin);
  console.log('yo');
  if(admin!=this.mid && admin!=null){
   this.transferAdminService.newAdmin(admin,this.token).subscribe(
     data => {
        this.try = JSON.stringify(data)
        console.log('----->>> try',this.try);
      },
      error => console.log(error)
    );
   this.adalService.logOut();
  }
}

getAdmins(){
  console.log('in getAdmins');
  this.transferAdminService.getAllAdmins(this.token).subscribe(
      data => {
        this.admins = data
        console.log('----->>> try',this.admins.length);
        for(var i=0;i<this.admins.length;i++){
          this.adminsName[i]=this.admins[i];
        }
        this.l=i;
        console.log('length',this.l);
        console.log(this.adminsName);
      },
      error => console.log(error)
    );
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferAdminPage');
  }
  ngOnInit(){
    console.log('in transfer admin');
    this.getAdmins();
  }

}
