import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AdalService } from 'ng2-adal/core';

export interface Data {
  dt: string;
}
@Injectable()
export class Search {
token;
  constructor(private http: Http, public adalService: AdalService) {
       
    this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);

    console.log('Hello Search Provider');
  }
  //   getAllBook():Observable<Data[]>{
  //     console.log('inside service getallbooks2');
  //   //  let headers = new Headers({ 'Authorization': 'Bearer ' + token });
  //   //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get('http://172.17.120.74:8000/getdata')
  //    .map((res:Response)  => res.json());
  // }
 getByCategory(category:string,token):Observable<Data[]>{
      console.log("in search service");
       let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
     return this.http.get('http://localhost:9890/lims/getCategoryWiseBooks/'+category,options)
     .map((res:Response)  => res.json());
  }
   getCategories(token):Observable<Data[]>{
      console.log("in search service");

       let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
     return this.http.get('http://localhost:9890/lims/getCategories',options)
     .map((res:Response)  => res.json());
  }

   getAllBooks(token):Observable<Data[]>{
     console.log("token-------by adal",token);
     let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/getAllBooks',options)
     .map((res:Response)  => res.json());
  }
      getAllBook():Observable<Data[]>{
      console.log('inside service getallbooks2');
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:9890/lims/getAllBooks',options)
     .map((res:Response)  => res.json());
  }
}