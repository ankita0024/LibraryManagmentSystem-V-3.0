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
export class GetRequestedBooks {
 token;
  constructor(public http: Http, public adalService: AdalService) {
     this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
    console.log('Hello Search Provider');
  }
    getRequestedBooks():Observable<Data[]>{
      console.log('inside service getallbooks----2');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/getAllRequestBooksHistory',options)
     .map((res:Response)  => res.json());
  }
  getReturnRequestedBooks():Observable<Data[]>{
      console.log('inside service getallbooks2');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/getAllReturnRequestBooksHistory',options)
     .map((res:Response)  => res.json());
  }
   issueBook(mid:string,isbn:string,issueDate:string,dueDate:string){
      console.log('inside service issue book');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/issueBook/'+mid+'/'+isbn+'/'+issueDate+'/'+dueDate,options)
  }
   declineBook(mid:string,isbn:string):Observable<any>{
      console.log('inside service declineBook');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/declineRequest/'+mid+'/'+isbn,options)
  }
  acceptReturn(mid:string,bookId:string){
      console.log('inside service return book');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/return/'+mid+'/'+bookId,options)
  }
}