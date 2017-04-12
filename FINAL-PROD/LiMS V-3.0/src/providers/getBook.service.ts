import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AdalService } from 'ng2-adal/core';

export interface Data {
  dt: string;
}
@Injectable()
export class GetBook {

newBook:any;
    putBook(book){
        this.newBook=book;
        console.log('put book : '+this.newBook);
    }
    getBook(){
        console.log('get book : '+this.newBook.title);
        return this.newBook;
    }
} 
