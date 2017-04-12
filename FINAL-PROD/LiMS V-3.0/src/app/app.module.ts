import { GetIsbn } from './../providers/getIsbn.service';
import { ReportsPage } from './../pages/reports/reports';
import { RecommendationService } from './../providers/recommendation.servie';
import { WishListService } from './../providers/wishList.service';
import { UserissuedhistoryPage } from './../pages/userissuedhistory/userissuedhistory';
import { UserManualPage } from './../pages/user-manual/user-manual';
import { Myissuedhistory } from './../providers/myissuedhistory';
import { ProfileService } from './../providers/profile-service';
import { SampleModalPage } from './../pages/modal/modal';
import { GetBook } from './../providers/getBook.service';
import { IssueService } from './../providers/issue-service';
import { DetailViewPage } from './../pages/detail-view/detail-view';
import { CategoriesPage } from './../pages/categories/categories';
import { LimsAdminComponent } from './lims-admin/lims-admin.component';
import { LimsUserComponent } from './lims-user/lims-user.component'; 
import { Ionic2RatingModule } from 'ionic2-rating'
import { Http } from '@angular/http';
import{BarcodeService} from './../providers/barcode.service';
import {GetRequestedBooks} from './../providers/getRequestedBooks.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TransferAdminService} from './../providers/transferAdmin.service';
import{BookIssuedHistory} from '../pages/bookIssuedHistory/bookIssuedHistory';
import{BookReturnedHistory} from '../pages/bookReturnedHistory/bookReturnedHistory';
import {GetReportsService } from './../providers/reports.service';
import { TransferAdminPage } from './../pages/transfer-admin/transfer-admin';
import { RolesPage } from './../pages/roles/roles';
import { ListPage } from './../pages/list/list';
import { BooksReturnedPage } from './../pages/books-returned/books-returned';
import { BooksRequestedPage } from './../pages/books-requested/books-requested';
import { ApprovalsPage } from './../pages/approvals/approvals';
import { AddBooksPage } from './../pages/add-books/add-books';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HelpPage} from '../pages/help/help';
import { NotificationPage } from '../pages/notification/notification';
import { SearchPage } from './../pages/search/search';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AcknowledgementPage} from '../pages/acknowledgement/acknowledgement';
import {RecommendationPage} from '../pages/recommendation/recommendation';
import {WishListPage} from '../pages/wishList/wishList';
import { Search } from '../providers/search.service';
import { AdminHomeBodyService} from '../providers/admin-home-body.service';
import { HomeBodyService } from '../providers/home-body.service';
import {NotificationService} from '../providers/notification.service';
import {AdalService} from 'ng2-adal/core';
import {Authenticate} from '../providers/authenticate';
import { APP_BASE_HREF,HashLocationStrategy,LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    CategoriesPage,
    HelpPage,
    NotificationPage,
    HomePage,
    TabsPage,
    RecommendationPage,
    WishListPage,
    AcknowledgementPage,
    LimsUserComponent,
    LimsAdminComponent,
    DetailViewPage,
    SampleModalPage,
     AddBooksPage,
    ApprovalsPage,
    ReportsPage,
    BooksReturnedPage,
    BooksRequestedPage,
    ListPage,
    RolesPage,TransferAdminPage,
    BookIssuedHistory,
    BookReturnedHistory,
    UserManualPage

  ],
  imports: [
    IonicModule.forRoot(MyApp,{locationStrategy: 'path'}),Ionic2RatingModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LimsUserComponent,
    SearchPage,
    CategoriesPage,
    HelpPage,
    NotificationPage,
    HomePage,
    TabsPage,
     RecommendationPage,
    WishListPage,
    AcknowledgementPage,
    LimsAdminComponent,
    DetailViewPage,SampleModalPage,
     AddBooksPage,
    ApprovalsPage,
    BooksRequestedPage,
    BooksReturnedPage,
    ListPage,
    ReportsPage,
    RolesPage,TransferAdminPage,
    BookIssuedHistory,
    BookReturnedHistory,
    UserManualPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},WishListService,NotificationService,GetRequestedBooks,GetReportsService,TransferAdminService,AdminHomeBodyService,GetIsbn,BarcodeService,HomeBodyService,Authenticate,Search,AdalService,IssueService,GetBook,ProfileService,RecommendationService,Myissuedhistory,{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {}
