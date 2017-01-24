import {
  Component
} from '@angular/core';
import {
  Geolocation
} from 'ionic-native';
import {
  NavController
} from 'ionic-angular';
import { FindSitePage } from '../find-site/find-site';

import {FindASiteFactory, FindASiteModel} from  '../../../providers/site/find-a-site';
@Component({
  templateUrl: 'select-site.html'
})
export class SelectSitePage {

  
  public sites:FindASiteModel[];

  constructor(public navCtrl: NavController , private findASiteFactory:FindASiteFactory) {
       findASiteFactory.fetch().then((result: FindASiteModel[]) => {
      this.sites = result;
    })
  }

  goToSite(site){
        this.navCtrl.push(FindSitePage, { site: site });
  }



}