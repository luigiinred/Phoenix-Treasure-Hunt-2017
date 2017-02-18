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
export class Account {
    teamCode: number;
    teamName: string;
    isAdmin: boolean;

    constructor(private http: Http) {

    }

    login(teamCode) {
        console.log(teamCode);
        return new Promise((resolve, reject) => {
            this.http.post(`${Constants.API_ENDPOINT}/get_team.php`, {
                teamCode: teamCode
            }).map(res => res.json()).subscribe(
                data => {
                    this.teamCode = teamCode;
                    this.teamName = data.name;
                    this.isAdmin = !!parseInt(data.admin);
                    resolve(data);
                }, error => {
                    console.log(error)
                    reject()
                })
        });
    }

    logout() {
        this.teamCode = null;
        this.teamName = null;
        this.isAdmin = null;
    }


}