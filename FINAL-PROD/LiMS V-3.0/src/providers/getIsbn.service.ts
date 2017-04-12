import { SearchPage } from './../pages/search/search';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the Search provider.

  See http://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export interface Data {
    dt: string;
}
@Injectable()
export class GetIsbn {

    constructor() {
        console.log('Under get isbn');
    }
    newIsbn:any;
    putIsbn(isbn){
        this.newIsbn=isbn;
        console.log('put isbn : '+this.newIsbn);
    }
    getBookIsbn(){
        console.log('put isbn : '+this.newIsbn);
        return this.newIsbn;
    }
}