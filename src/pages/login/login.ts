import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { Account } from '../../providers/account/account';
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  teamCode: number[] = [];

  constructor(public navCtrl: NavController, private account: Account, public toastCtrl: ToastController) { }


  add(n: number) {
    if (this.teamCode.length !== 6) {
      this.teamCode.push(n);
    }
  }
  remove() {
    if (this.teamCode.length !== 0) {
      this.teamCode.splice(this.teamCode.length - 1, 1);
    }
  }


  login() {

    this.account.login(parseInt(this.teamCode.join(''))).then(() => {
      this.navCtrl.setRoot(TabsPage);
    }, (error) => {
      console.log('Invalid Team Code');
      let toast = this.toastCtrl.create({
        message: 'Invalid Team Code',
        duration: 3000
      });
      toast.present();
    });


  }

}
