import { LimsUserComponent } from './../../app/lims-user/lims-user.component';
import { AdalService } from 'ng2-adal/core';
import { WishListService } from './../../providers/wishList.service';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HomeBodyService } from '../../providers/home-body.service';

@Component({
  selector: 'page-wishList',
  templateUrl: 'wishList.html'
})
export class WishListPage {

  book:any=[];
  isbn;
  token;
  mid;
  newdata;
  newflag: boolean;
  constructor(public navCtrl: NavController, private wishList: WishListService, public adalService: AdalService, private HomeBodyService: HomeBodyService, private toastCtrl: ToastController) {
    this.token = HomeBodyService.token;
    this.mid = HomeBodyService.mid;
  }

  getBookDetails() {
    console.log('inside service getbook details' + this.mid);
    this.wishList.getWishBookDetails(this.mid, this.token).subscribe(
      data => {
        this.book = data
        console.log(this.book);
      },
      error => console.log(error)
    );
  }
  removeBook(isbn) {
    this.isbn = isbn;
    console.log('inside service getbook details' + this.mid);
    this.wishList.removeBook(this.isbn, this.mid, this.token).subscribe(
      data => {
        this.newdata = data;
        console.log(data);
        console.log(this.newdata.ok);
        if (this.newdata.ok === 1) {
          console.log("successssssssssssssssss");
          this.showToast('Successfully removed from Wishlist!!', 'success');
          this.newflag = true;
           this.getBookDetails();
        }
      },
      error => console.log(error)
    );
  }
  showToast = function (message: string, getColor: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000,
      cssClass: getColor
    });
    toast.present();
  }
  ngOnInit() {
    this.getBookDetails();

  }
}