import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AdalService } from 'ng2-adal/core';

export interface data {
  isbn: string;
}
  
@Injectable()

export class HomeBodyService {
  token;
  mid;
  name;
  email;
  constructor(private http: Http, public adalService: AdalService) {
    this.token = this.adalService.getCachedToken(this.adalService.config.loginResource);
    this.mid = this.adalService.userInfo.userName.substring(0, 8);
    this.name = this.adalService.userInfo.profile.name;
    this.email = this.adalService.userInfo.profile.unique_name;
  }
  getMyBookIDs(id: string, token): Observable<data[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    console.log("hiee")
    return this.http.get("http://localhost:9890/lims/getmyMobileAssetBookIds/" + id, options)
      .map((res: Response) => res.json());
  }
  getMyBook(id: string, name: string, token): Observable<data[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/getmyAsset/" + id + "/" + name, options)
      .map((res: Response) => res.json());
  }
  returnRequest(mid: string, bookId: string, token): Observable<data[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/returnRequest/" + mid + "/" + bookId, options)
      .map((res: Response) => res.json());
  }
  renewBook(mid: string, bookId: string, token){
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/renewBook/" + bookId + "/" + mid, options)
      .map((res: Response) => res);
  }
  rating(mid: string, isbn: string, value: number, token): Observable<data> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/rating/" + mid + "/" + isbn + "/" + value, options)
      .map((res: Response) => res.json());
  }

  createProfile(mid: string, name: string, email: string, token) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:9890/lims/createProfile/" + mid + "/" + name + "/" + email, options)
      .map((res: Response) => res);
  }
cancelRequset(mid:string,isbn:string,token){
    console.log("Cancelllllllll",mid+" "+isbn);
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get("http://localhost:9890/lims/declineRequest/" + mid + "/" + isbn , options)
      .map((res: Response) => res); 
  }


}