import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from '../constants/constants';

/*
  Generated class for the Account provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Settings {
  teamCode: number;
  teamName: string;

  constructor(private http: Http) {

  }

  getSettings() {
    console.log();
    return new Promise((resolve, reject) => {
      this.http.get(`${Constants.API_ENDPOINT}/get_hunt_settings.php`).map(res => res.json()).subscribe(
        data => {
          resolve(data);
        }, error => {
          console.log(error)
          reject()
        })
    });
  }

  logout() {

  }


}