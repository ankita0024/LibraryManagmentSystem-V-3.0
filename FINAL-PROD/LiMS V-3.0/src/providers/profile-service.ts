import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the ProfileService provider.

  See http://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export interface Data {
  dt: string;
}
@Injectable()
export class ProfileService {

  constructor(public http: Http) {
    console.log('Hello ProfileService Provider');
  }
    updateProfile(mid, genre,token):Observable<Data[]>{
       let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
          return this.http.get('http://localhost:9890/lims/updateUserProfile/'+mid+'/'+genre,options)
              .map((res:Response)=>res.json()) ;
            }
 getMyGenre(mid,token){
       let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      let options = new RequestOptions({ headers: headers });
          return this.http.get('http://localhost:9890/lims/getMyFavGenre/'+mid,options)
              .map((res:Response)=>res) ;
            }

}
