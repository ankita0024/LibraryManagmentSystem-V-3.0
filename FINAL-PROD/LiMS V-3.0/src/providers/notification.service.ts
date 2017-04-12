import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AdalService } from 'ng2-adal/core';

/*
  Generated class for the Search provider.

  See http://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export interface Data {
  dt: string;
}
@Injectable()
export class NotificationService {
  token;
  mId;
  isbn;
  constructor(public http: Http, public adalService: AdalService) {
    console.log('Hello wishlist Provider');
    this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
    this.mId = this.adalService.userInfo.userName.substring(0, 8);
    // this.name = this.adalService.userInfo.profile.name;
    // this.email = this.adalService.userInfo.profile.unique_name;
  }
  getIssueDetails(){
    console.log('inside notification service');
    console.log('in notification---------->' +  this.mId);
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/getNotifications/" + this.mId,options)
      .map((res: Response) => res.json());
  }
}
