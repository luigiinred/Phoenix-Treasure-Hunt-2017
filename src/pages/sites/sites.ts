import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, ToastController } from 'ionic-angular';
import { SiteFactory, SiteModel } from '../../providers/site/site';
import { Account } from '../../providers/account/account';
@Component({
  selector: 'page-sites',
  templateUrl: 'sites.html'
})
export class SitesPage {

  public latitude;
  public longitude;
  public message;
  public sites: SiteModel[];


  constructor(public navCtrl: NavController, private siteFactory: SiteFactory, public account: Account, public toastCtrl: ToastController) {

  }
  ionViewWillEnter() {
    this.siteFactory.fetch().then((result: SiteModel[]) => {
      this.sites = result;
    })
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.siteFactory.fetch().then((result: SiteModel[]) => {
      this.sites = result;
      refresher.complete();
    })

  }
  checkIn() {
    this.siteFactory.checkIn().then((response: { message: string, sites: SiteModel[] }) => {
      this.sites = response.sites;
      let toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();
    }, (error) => {

    });
  }



}