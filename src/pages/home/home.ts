import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, ToastController } from 'ionic-angular';
import { SiteFactory, SiteModel } from '../../providers/site/site';
import { Account } from '../../providers/account/account';
import { Settings } from '../../providers/settings/settings';
import { TimerComponent } from '../../components/timer/timer';
import { ImagePicker } from 'ionic-native';

import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public latitude;
  public longitude;
  public message;
  public sites: SiteModel[];
  public start: Date;
  public end: Date;
  public secondsTillStart: number;
  public secondsTillEnd: number;
  canCheckIn = true;

  constructor(public navCtrl: NavController, private siteFactory: SiteFactory, public toastCtrl: ToastController, public account: Account, public settings: Settings) {
    siteFactory.fetch().then((result: SiteModel[]) => {
      this.sites = result;
    })
    settings.getSettings().then((result: any) => {
      this.secondsTillStart = ((new Date(result.startTime)).getTime() - (new Date()).getTime()) / 1000;
      // this.secondsTillEnd = (new Date(result.endTime)).getTime() - (new Date()).getTime();
      this.secondsTillEnd = ((new Date(result.endTime)).getTime() - (new Date()).getTime()) / 1000;
    })
  }
  doRefresh(refresher) {
    this.settings.getSettings().then((result: any) => {
      this.secondsTillStart = ((new Date(result.startTime)).getTime() - (new Date()).getTime()) / 1000;
      // this.secondsTillEnd = (new Date(result.endTime)).getTime() - (new Date()).getTime();
      this.secondsTillEnd = ((new Date(result.endTime)).getTime() - (new Date()).getTime()) / 1000;
    })

  }
  checkIn() {
    this.canCheckIn = false;
    this.siteFactory.checkIn().then((response: { message: string, sites: SiteModel[] }) => {
      this.sites = response.sites;
      let toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000,
        position: 'top'
      });
      toast.present().then(() => {
        setTimeout(
          () => {
            this.canCheckIn = true;
          }, 3000
        );
      });
    }, (error) => {
      this.canCheckIn = true;

    });
  }

  openMapToStart() {
    LaunchNavigator.navigate('Toronto, ON')
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );
  }

  pics() {
    ImagePicker.getPictures({}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }


}