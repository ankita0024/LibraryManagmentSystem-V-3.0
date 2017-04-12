import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Myissuedhistory provider.

  See http://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export interface Data {
  dt: string;
}
@Injectable()
export class Myissuedhistory {

  constructor(public http: Http) {
    console.log('Hello Myissuedhistory Provider');
  }
getMyIssuedHistory(mid:string,date:string,token):Observable<Data[]>{
      console.log("in search service");
      let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
     return this.http.get('http://localhost:9890/lims/getMyIssuedHistory/'+mid+'/'+date,options)
     .map((res:Response)  => res.json());
  }
}
