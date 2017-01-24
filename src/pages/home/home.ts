import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, ToastController } from 'ionic-angular';
import { SiteFactory, SiteModel } from '../../providers/site/site';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public latitude;
  public longitude;
  public message;
  public sites: SiteModel[];


  constructor(public navCtrl: NavController, private siteFactory: SiteFactory, public toastCtrl: ToastController) {
    siteFactory.fetch().then((result: SiteModel[]) => {
      this.sites = result;
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