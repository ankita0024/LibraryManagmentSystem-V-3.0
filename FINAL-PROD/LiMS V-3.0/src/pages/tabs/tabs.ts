import { LimsUserComponent } from './../../app/lims-user/lims-user.component';
// import { SearchPage } from './../search/search';
import { data } from './../../providers/issue-service';
import { HomePage } from './../home/home';
import { Nav, NavController } from 'ionic-angular';
import { RecommendationPage } from './../recommendation/recommendation';
import { Splashscreen } from 'ionic-native';
import { Component, Injectable } from '@angular/core';
import { SearchPage } from '../search/search';
import { NotificationPage } from '../notification/notification';
import { NotificationService } from '../../providers/notification.service';

@Component({
  selector:'page-tab',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabRoot: any;
  tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = NotificationPage;
  tab4Root: any = RecommendationPage;
  constructor(public nav: NavController, private notificationService: NotificationService) {
    this.tab1Root = HomePage;
  }
  data;
  count: number = 0;
  // changeTabs(text) {
  //   console.log('trying--------->');
  //   // if(text==""){
  //   //   console.log("blank");
  //   //   this.tabRoot=HomePage;
  //   // }
  //   if (text == "home")
  //     //  this.tab1Root=HomePage;
  //     this.tab2Root = "";
  //      this.tab3Root = "";
  //       this.tab4Root = "";
   
  //   //  this.nav.push(HomePage);
  //   if (text == "search") {
  //     this.tab2Root = SearchPage;
  //     this.tab1Root = "";
  //   }

  //   if (text == "notifications") {
  //     this.tab3Root = NotificationPage;
  //     this.tab1Root = "";
  //   }

  //   if (text == "book") {
  //     this.tab4Root = RecommendationPage;
  //     this.tab1Root = "";
  //   }


  
  // getIssueDetails() {
  //   console.log('inside notification function');
  //   this.notificationService.getIssueDetails().subscribe(
  //     data => {
  //       this.data = data
  //       console.log('in tabssssss....',this.data);
  //       console.log(this.data[0].notification)
  //       for(let x of this.data){
  //         if(x.notification=="true"){
  //           this.count=this.count+1;
  //           console.log('---->yo',this.count)
  //         }
  //       }
  //     },
  //     error => console.log(error)
  //   );
  // }
  ngOnInit() {

    // this.tabRoot=HomePage;
    // this.getIssueDetails();
  }

}
