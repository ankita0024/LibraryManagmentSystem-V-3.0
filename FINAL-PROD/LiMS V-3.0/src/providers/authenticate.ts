import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Authenticate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Authenticate {

  constructor(public http: Http) {
    console.log('Hello Authenticate Provider');
  }
      public get adalConfig(): any {
        return {
            tenant: '85c997b9-f494-46b3-a11d-772983cf6f11',
            clientId: '99373bce-fb68-4bcd-9adc-a9df099871d1'
            // redirectUri: "http://digital-web-repo.azurewebsites.net/lims-native",
            // postLogoutRedirectUri: window.location.origin + '/'
        };
    }
}
