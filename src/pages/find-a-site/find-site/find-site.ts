import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';

import { FindASiteFactory } from '../../../providers/site/find-a-site';

@Component({
  templateUrl: 'find-site.html'
})
export class FindSitePage {

  public latitude;
  public longitude;
  public distance;
  public speed = 0;
  public accuracy = 0;
  public heading = 0;
  public site;
  count = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private findASiteFactory: FindASiteFactory) {

    Geolocation.getCurrentPosition({ enableHighAccuracy: false }).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.speed = resp.coords.speed;
      this.accuracy = resp.coords.accuracy;

      this.distance = this.calcCrow(this.latitude, this.longitude, this.site.lat, this.site.long);
    })

    this.site = navParams.get('site');

    // window.setInterval(() => {
    //   Geolocation.getCurrentPosition().then((resp) => {
    //     this.latitude = resp.coords.latitude;
    //     this.longitude = resp.coords.longitude;

    //     this.distance = this.calcCrow(this.latitude, this.longitude, this.site.lat, this.site.long);
    //     this.speed = resp.coords.speed;
    //     this.accuracy = resp.coords.accuracy;
    //     this.count++;
    //   })
    // }, 500);

    let watch = Geolocation.watchPosition({ enableHighAccuracy: false });

    watch.subscribe((data: any) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
      this.speed = data.coords.speed;
      this.heading = data.coords.heading;
      this.accuracy = data.coords.accuracy;
      this.distance = this.calcCrow(this.latitude, this.longitude, this.site.lat, this.site.long);
      this.count++;
    })

  }

  calcCrow(lat1, lon1, lat2, lon2) {

    var R = 6371 * 1000; // m
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.floor(d);
  }

  // Converts numeric degrees to radians
  toRad(Value) {
    return Value * Math.PI / 180;
  }



}