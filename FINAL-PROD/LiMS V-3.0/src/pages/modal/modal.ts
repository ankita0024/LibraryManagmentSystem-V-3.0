import { Component,OnInit,Input } from '@angular/core';
import { ViewController} from 'ionic-angular';
import { NavController,ToastController,NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import {LimsUserComponent} from '../../app/lims-user/lims-user.component';
import { HomeBodyService,data } from '../../providers/home-body.service';
@Component({
  templateUrl: 'modal.html'
})
export class SampleModalPage {
avgRating:number=0;
callback;
book:any;
token;
length;
errorMessage: string;
mid:string;
  constructor(private params:NavParams,public nav:NavController,private viewCtrl: ViewController,private toastCtrl: ToastController,private HomeBodyService:HomeBodyService) {
    this.token=this.HomeBodyService.token;
    this.mid=this.HomeBodyService.mid;
  }
    showToast=function(message:string,getColor:string){
                               let toast = this.toastCtrl.create({
                            message:message,
                            position:'bottom',
                             duration: 3000,
                            cssClass:getColor
                                });
                            toast.present();
                              }

  save=function(data,CH) {
   this.bookToBeReturned=this.book.isbn;
console.log(this.book.issueDetails.length);
for (let v = 0; v < this.book.issueDetails.length; v++) {
    if (this.book.issueDetails[v].mId === this.mid) {
         this.HomeBodyService.returnRequest(this.mid, this.book.issueDetails[v].bookId,this.token)
         .subscribe(response=> {
            if (response.length !== 0) {
              // this.booksIssued = this.booksIssued - 1;
              // this.booksReturned = this.booksReturned + 1;
              // this.getMyBooks(this.mid,this.flag1);

              if(data!=0 && CH=='S')
              {
                this.HomeBodyService.rating(this.mid, this.book.isbn,data,this.token)
                       .subscribe(response=> {
                          // console.log(this.data);
                         this.showToast('Thank You For The Rating...!  Kindly go and Submit the book to the Library!','info');
                      
                  },error=>this._logError(error));
              }
              else{
                    this.showToast('Successfully Requested! Kindly go and Submit the book to the Library!','success');
              }
          
        } else {
           this.showToast('Sorry. Please try again later ...','oops');
              }},error=>this._logError(error));
                  }
            }
            this.viewCtrl.dismiss();
            this.nav.setRoot(LimsUserComponent);
  }
 
  private _logError(data) {
    this.errorMessage = data.message;
  }
  // close() {
  //   this.viewCtrl.dismiss();
  // }
ngOnInit() {
    if (this.params.data) {
      this.book = this.params.data;
      console.log("modalllllllll",this.book)
    }
  }

}
