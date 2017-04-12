import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Myissuedhistory} from '../../providers/myissuedhistory'
import { HomeBodyService } from '../../providers/home-body.service';
/*
  Generated class for the Userissuedhistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userissuedhistory',
  templateUrl: 'userissuedhistory.html'
})
export class UserissuedhistoryPage {
mid:string;
length;
myDate:string;
showBooks:boolean=false;
Nobooks:boolean=false;
books:any[];
token;
  constructor(public navCtrl: NavController, public navParams: NavParams,public Myissuedhistory:Myissuedhistory,public HomeBodyService:HomeBodyService) {
    // this.HomeBodyService=HomeBodyService;
    this.token=HomeBodyService.token;
    this.mid=HomeBodyService.mid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserissuedhistoryPage');
  }
getMyIssuedHistory=function(date)
{
  
  if(date.charAt(5)==0){
    date=date.slice(0,5)+date.slice(6,10);
    console.log(date);
  }
  this.showBooks=true;
  // console.log("THISSSSSSSSSSS ISSS SELECTEDDDDD:",date);
 this.Myissuedhistory.getMyIssuedHistory(this.mid,date,this.token)
.subscribe(data =>{
       this.books=data;
        if(this.books.length==0){
this.Nobooks=true;
   }
   else
   this.Nobooks=false;
       console.log("heloooooooooooooo",this.books)
       
   })
  

   }
}
