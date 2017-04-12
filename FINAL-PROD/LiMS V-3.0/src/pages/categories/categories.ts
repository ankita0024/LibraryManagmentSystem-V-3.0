import { Search,Data } from './../../providers/search.service';
import { Component,OnInit} from '@angular/core';
import { NavController,PopoverController, NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
categories;
originalCategories;
  constructor(public navCtrl: NavController, public navParams: NavParams,public searchService:Search,public viewCtrl:ViewController ) {
    
    // console.log(this.categories)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }
  //   getCategories=function(){
  //    console.log("in getCategories")

  //  this.searchService.getCategories().subscribe(data =>{
      //  if(data.length>=1)
      //  {
            //  this.loaded=true;
  //           console.log("search service",data)
  //         this.categories=data[0].categories;
  //  console.log("in categorries.....", this.categories)
          // if( this.categories.length==9)
          // this.length=true;
          // return this.categories.length;
      //  }

    
  //    })

  //  }
   valueChanged=function(category){
        category.flag=!category.flag;
     console.log("value isssssssss",category);
  
      // this.sendCategories();
   }
   sendCategories=function(){

this.viewCtrl.dismiss(this.categories);
console.log("this.categories",this.categories)
   }

   close=function(){
    //  this.categories=this.originalCategories;
     this.viewCtrl.dismiss(null);
   }

 ngOnInit() {
    // this.getCategories();
this.categories=this.navParams.data;
console.log(this.categories)
 }
}
