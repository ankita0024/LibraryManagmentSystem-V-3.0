import { GetBook } from './../../providers/getBook.service';
import { DetailViewPage } from './../detail-view/detail-view';
import { HomeBodyService } from './../../providers/home-body.service';
import { AdalService } from 'ng2-adal/services/adal.service';
import { RecommendationService } from './../../providers/recommendation.servie';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-recommendation',
  templateUrl: 'recommendation.html'
})
export class RecommendationPage {

 book:any=[];
 books;
 isbn;
 token;
 flag;
 mid;
  constructor(public navCtrl: NavController, public adalService: AdalService,private recommendationList:RecommendationService,  private HomeBodyService: HomeBodyService,private getBook:GetBook) {
    this.token = HomeBodyService.token;
    this.mid = HomeBodyService.mid;
  }
getRecommendationList() {
    console.log('inside service getbook details'+this.mid);
    this.recommendationList.recommendationList(this.mid,this.token).subscribe(
      data => {
        this.books = data
        console.log(this.books);
      for(var i=0;i<10;i++){
        if(this.books[i]){
        this.book[i]=this.books[i];
        }
      }
      console.log('10 books',this.book);
      },
      error => console.log(error)
    );
  }
  showDetailView=function(book){
  // this.book=this.categorisedBooks[index];
  this.book=book;
  console.log("Book title"+this.book.title);
  this.getBook.putBook(this.book);
  
  // console.log("index",index);
  // console.log("book is",this.book)
this.navCtrl.push(DetailViewPage); 
// this.nav.push(DetailViewPage);
  }
  ngOnInit() {
    this.getRecommendationList();
  }
  
}