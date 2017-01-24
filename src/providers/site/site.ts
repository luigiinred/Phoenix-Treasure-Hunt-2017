import {
  Injectable
} from '@angular/core';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';
import {
  Constants
} from '../constants/constants';
import {
  Account
} from '../account/account';
import {
  Geolocation
} from 'ionic-native';

export class SiteModel {

  public id: number;
  public name: string;
  public isCheckedIn: boolean;

  constructor(id: number, name: string, isCheckedIn: boolean) {
    this.id = id;
    this.name = name;
    this.isCheckedIn = isCheckedIn;
  }

}

@Injectable()
export class SiteFactory {

  sites: SiteModel[];

  constructor(private http: Http, private account: Account) {
    this.sites = [];
  }

  public fetch() {
    return new Promise((resolve, reject) => {
      this.http.post(`${Constants.API_ENDPOINT}/get_sites.php`, {
        teamCode: this.account.teamCode,
      }).map(res => res.json()).subscribe(
        data => {
          this.sites = data.map(site => new SiteModel(site.number, site.name, site.checkedIn))
          resolve(this.sites);
        }, error => {
          console.log(error);
          reject();
        });
    });
  }

  public checkIn() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition().then((resp) => {

        this.http.post(`${Constants.API_ENDPOINT}/update_location_or_checkin.php`, {
          teamCode: this.account.teamCode,
          lat: resp.coords.latitude,
          lon: resp.coords.longitude,
          checkIn: true
        }, {
            withCredentials: false
          }).map(res => res.json()).subscribe(
          data => {
            if (data.statusCode === 0) {
              resolve("Checked In");
              this.fetch().then((sites) => {
                resolve({ message: "Checked In", sites: sites });
              });
            }
            if (data.statusCode === 1) {
              resolve({ message: "Already Checked In", sites: this.sites });
            }
            if (data.statusCode === 2) {
              resolve({ message: "Too Far From A Site", sites: this.sites });
            }
          }, error => {
            console.log(error);
            reject();
          });
      });
    });
  }


}