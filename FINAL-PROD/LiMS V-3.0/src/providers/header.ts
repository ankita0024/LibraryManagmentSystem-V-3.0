import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
  Generated class for the Header provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export interface data{
  bookId:string;
  title:string;

}
@Injectable()
export class Header {

  constructor(public http: Http) {
    console.log('Hello Header Provider');
  }

getMyHistory(mid:string,date:string,token):Observable<data[]>{
  let headers = new Headers({ 'Authorization': 'Bearer ' + token });
  let options = new RequestOptions({ headers: headers });
  return this.http.get("http://localhost:9890/lims/getMyIssuedHistory/"+mid+"/"+date,options)
  .map((res:Response)=>res.json());
  }
}
