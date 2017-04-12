import { HelpPage } from './../help/help';
import { UserManualPage } from './../user-manual/user-manual';
import { SampleModalPage } from './../modal/modal';
import { LimsUserComponent } from './../../app/lims-user/lims-user.component';
import { AdalService } from 'ng2-adal/services/adal.service';
import { HomeBodyService,data } from './../../providers/home-body.service';
import { Component,Input, OnInit, OnDestroy  } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { ModalController, AlertController, PopoverController, App, ViewController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  flagHome1: boolean;
  @Input()
  flagHome: boolean;
  mid: string;

  name: string;
  email: string;
  books: data[] = [];
  bookIds: any[];
  flag1: boolean = false;
  booksIssued: number;
  booksReturned: number = 0;
  bookToBeReturned: any;
  errorMessage: string;
  data: number = 0;
  issuedCircle1: boolean = false;
  issuedCircle2: boolean = false;
  issuedCircle3: boolean = false;

  profile;
  token;
  constructor(private HomeBodyService: HomeBodyService, public adalService: AdalService, public nav: NavController, public navParams: NavParams, public Modal: ModalController, private alertCtrl: AlertController, public popoverCtrl: PopoverController, private toastCtrl: ToastController) {

    this.HomeBodyService = HomeBodyService;
    this.nav = nav;
    this.booksIssued;
    this.booksReturned = 0;
    this.bookToBeReturned;

console.log("Hey inside home constructor.......")
    this.token = HomeBodyService.token;
    // this.mid = this.HomeBodyService.mid;
    this.bookIds = [];
   }

   onPageWillEnter() {
    this.mid = this.HomeBodyService.mid;
    this.name = this.HomeBodyService.name;
    this.email = this.HomeBodyService.email;
   
    // let flag = this.flagHome;
    this.getMyBooks(this.mid, false);

}
//   renew() {
    
//   let toast = this.toastCtrl.create({
//     message: 'Congratulations !! Your book has been renewed.',
//     duration: 1300,
//     position: 'bottom',
    
//   });

//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });

//   toast.present();
// }

// Return() {
    
//   let toast = this.toastCtrl.create({
//     message: 'Your request for return has been approved. Kindly go to the libarary and return the book !!',
//     duration: 3000,
//     position: 'bottom',
    
//   });

//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });

//   toast.present();
// }
showToastWithCloseButton = function (message: string, getColor: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom',
      cssClass: getColor
    });
    toast.present();
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
getClassForCircle = function () {
    if (this.books.length == 1) {
      this.issuedCircle1 = true;
      return this.issuedCircle1
    }
    else if (this.books.length == 2) {
      this.issuedCircle2 = true;
      return this.issuedCircle2
    }
    else if (this.books.length == 3) {
      this.issuedCircle3 = true;
      return this.issuedCircle3
    }

  }
  getTry(){
    console.log('Trying Function--------->');
  }

 getMyBooks = function (mid: string, flag1: boolean) {
    let book: any[];

    return this.HomeBodyService.getMyBookIDs(mid, this.token).subscribe(response => {
      // this.bookIds=bookIds;
      console.log(response);
      // this.booksIssued=this.bookIds[0].issueDetails.length;

      if ((response[0].issueDetails.length + response[0].requestedBookDetails.length) === 0) {
        this.flag1 = false;
      }
      else {
        if (this.navParams.get('flagHelp')) {
          this.flag1 = !this.navParams.get('flagHelp');
          console.log("in navparamssssss for helppppppppp", this.flag1)
        }
        else{
          let count1, count;
        count1 = response[0].requestedBookDetails.length;
        count = response[0].issueDetails.length;
        console.log("countttttt", count);
        console.log("sssssss", response[0]);
        this.flag1 = true;
        // console.log(this.bookIds); 
        let str1: string;
        let bookId: string;
        for (let i: number = 0; i < count; i++) {
          bookId = response[0].issueDetails[i].bookId;
          str1 = bookId.slice(0, 13);
          console.log("isbn", str1);
          this.bookIds.push({ 'isbn': str1, 'isRequested': false });
        }
        for (let i = 0; i < count1; i++) {
          let isbn = response[0].requestedBookDetails[i].isbn;
          console.log(isbn);
          this.bookIds.push({ 'isbn': isbn, 'isRequested': true });
        }
        console.log(this.bookIds);
        let j = 0;
        for (let i = 0; i < this.bookIds.length; i++) {

          let isbn = this.bookIds[i].isbn;

          this.HomeBodyService.getMyBook(isbn, mid, this.token).subscribe(response => {
            // this.book=book;
            console.log(response);
            for (let j = 0; j < this.bookIds.length; j++) {
              if (response[0].isbn === this.bookIds[j].isbn) {
                this.requestFlag = this.bookIds[j].isRequested;
                console.log(this.requestFlag);
              }
            }
            if (this.requestFlag === false) {
              response[0].isIssued = true;
              for (let k = 0; k < response[0].issueDetails.length; k++) {
                if (response[0].issueDetails[k].mId == this.mid) {
                  if (response[0].issueDetails[k].returnRequest == "true") {
                    response[0].isReturnRequested = true;
                  }
                  else
                    response[0].isReturnRequested = false;
                }
              }

              response[0].dueDate = response[0].issueDetails[0].dueDate;
              this.bookRate = response[0].avgRating;
              this.books.push(response[0]);
            } else {
              response[0].isReturnRequested = false;
              console.log(response, "isIssued:")
              response[0].isIssued = false;
              this.bookRate = response[0].avgRating;
              this.books.push(response[0]);
            }
            // console.log("duedate........",book)
            // this.book.dueDate = book[0].issueDetails[0].dueDate;
            // this.books.push(book);
            // console.log(this.books);
            this.getClassForCircle();
          });
        }
        }
        
      }
    });
  }
  renew = function (index: number) {
    console.log(index);
    var book = this.books[index];
    console.log("renew boooooook", book)
    console.log(book.issueDetails.length);
    for (var v = 0; v < book.issueDetails.length; v++) {
      if (book.issueDetails[v].mId === this.mid) {
        this.HomeBodyService.renewBook(this.mid, book.issueDetails[v].bookId, this.token)
          .subscribe(response => {
            console.log("response of renew", response)
            if (response !== "") {
              this.showToast('Successfully renewed the book!', 'success');
              // this.getMyBooks(this.mid,this.flag1);
              //   this.viewCtrl.dismiss();
              // this.appCtrl.(HomePage);
              // location.reload(true);
              this.nav.setRoot(LimsUserComponent);
              // this.getMyBooks(this.mid,this.flag1);
            } else {
              this.showToastWithCloseButton('Sorry. Please try again later ...', 'oops');
            }
          }, error => this._logError(error));
      }
    }
  }
   cancelRequest=function(book){
    var isbn=book.isbn
    this.HomeBodyService.cancelRequset(this.mid,isbn,this.token).subscribe(
    response=>{
      console.log("Cancel request",response);
    if(response._body=="success")
    {
    console.log("successssssssssssssssss");
    this.showToast('Successfully cancelled the request!', 'success');
    this.nav.setRoot(LimsUserComponent);
    }

    else{
    this.showToastWithCloseButton('Sorry. Please try again later ...', 'oops');
    }
    }, error => this._logError(error));
  }
  private _logError(data) {
    this.errorMessage = data.message;
  }
  showModal() {
    console.log("Clicked");
    const modal = this.Modal.create(SampleModalPage, { showBackdrop: true });
    modal.present();
  }
   presentConfirm(index: number) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Renew',
      message: 'This book can be renewed(once) for 10days. Click OK to continue and CANCEL to go back',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.renew(index);
            console.log('renewd');
          }
        }
      ]
    });
    alert.present();
  }

   presentPopover(myEvent, book) {
    console.log(book);
    //  this.booksIssued = this.booksIssued - 1;
    //     this.booksReturned = this.booksReturned + 1;
    // this.getMyBooks(this.mid,this.flag1);
    let popover = this.popoverCtrl.create(SampleModalPage, book, { cssClass: 'ratingPopover' });
    popover.present({
      // ev: myEvent
    });
  }


  ngOnInit() {
    // console.log(this.flagHome);
    // console.log("hjkhsdf",this.flagHome1);
  
    console.log("Homeeeeeeee")
    this.mid = this.HomeBodyService.mid;
    this.name = this.HomeBodyService.name;
    this.email = this.HomeBodyService.email;
    this.HomeBodyService.createProfile(this.mid, this.name, this.email, this.token)
      .subscribe(response => {
        console.log("response of create profile", response);

      }, error => this._logError(error));
    // let flag = this.flagHome;
    this.getMyBooks(this.mid, this.flag1);

    this.flagHome1 = this.flagHome;
    if (this.navParams.get('flag')) {
      this.flagHome1 = this.navParams.get('flag');
      console.log("in navparamssssss", this.flagHome1)
    }
    if (this.navParams.get('flagHelp')) {
      this.flag1 = !this.navParams.get('flagHelp');
      console.log("in navparamssssss", this.flag1)
    }

    console.log("hhhhhhhhhome", this.flagHome1)
console.log("In home page again... Again..");

    // console.log("tokennnnnnnnnnnnn",this.token)
    // console.log("profileeeeee",this.profile)

    //     setTimeout(() => {
    //  location.reload(true)
    //  }, 2500);
  }

  


}
