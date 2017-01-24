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

export class FindASiteModel {

  public id: number;
  public name: string;
  public lat: number;
  public long: number;


  constructor(id: number, name: string, lat: number, long:number) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.long = long;
  }


}

@Injectable()
export class FindASiteFactory {

  sites: FindASiteModel[];
  

  constructor(private http: Http) {
    this.sites = [];
  }

  public fetch() {
    return new Promise((resolve, reject) => {
      

      this.http.get(`${Constants.API_ENDPOINT}/find_a_sites.php`, {
        withCredentials: false
      }).map(res => res.json()).subscribe(
        data => {
          this.sites = data.map(site => new FindASiteModel(site.id, site.name, site.lat, site.lon))
          resolve(this.sites);
        }, error => {
                   
          console.log(error);
          reject();
        });
    });
  }


}