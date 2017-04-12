import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AdalService } from 'ng2-adal/core';

export interface Data {
  dt: string;
}

@Injectable()
export class RecommendationService {
  token;
  mid;
  isbn;
  constructor(public http: Http, public adalService: AdalService) {
    console.log('Hello wishlist Provider');
    this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
    this.mid = this.adalService.userInfo.userName.substring(0, 8);
    // this.name = this.adalService.userInfo.profile.name;
    // this.email = this.adalService.userInfo.profile.unique_name;
  }

  recommendationList(mid: string, token): Observable<Data[]> {
    console.log('inside recommendationlist');
    console.log('in addto' + mid);
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/recommend/" + mid, options)
      .map((res: Response) => res.json());
  }
}