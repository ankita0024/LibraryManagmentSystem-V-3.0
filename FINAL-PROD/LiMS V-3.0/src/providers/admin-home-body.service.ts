import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface Id {
  mId: string;
}
@Injectable()
export class AdminHomeBodyService {

  constructor(private http:Http) { }
    getAdminId(token):Observable<Id[]>{
      let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
     return this.http.get('http://localhost:9890/lims/getAdminId',options)
     .map((res:Response)  => res.json());
  }
  
}
