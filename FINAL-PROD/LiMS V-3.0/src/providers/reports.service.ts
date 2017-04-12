import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
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
export class GetReportsService {
 token;
  constructor(public http: Http, public adalService: AdalService) {
     this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
    console.log('Hello Search Provider');
  }
    getToBeReturnedHistory():Observable<Data[]>{
      console.log('inside service getallbooks----2');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/getAllIssuedBooksHistory',options)
     .map((res:Response)  => res.json());
  }
  getAllReturnedHistory():Observable<Data[]>{
      console.log('inside service getallbooks2');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/getAllReturnedBooksHistory',options)
     .map((res:Response)  => res.json());
  }
}