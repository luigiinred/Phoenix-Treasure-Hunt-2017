import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SitesPage } from '../pages/sites/sites';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { FindSitePage } from '../pages/find-a-site/find-site/find-site';
import { SelectSitePage } from '../pages/find-a-site/select-site/select-site';


import { Account } from '../providers/account/account';
import { Settings } from '../providers/settings/settings';
import { SiteFactory } from '../providers/site/site';
import { FindASiteFactory } from '../providers/site/find-a-site';
import { TimerComponent } from '../components/timer/timer';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SitesPage,
    TabsPage,
    LoginPage,
    FindSitePage,
    SelectSitePage,
    TimerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SitesPage,
    TabsPage,
    FindSitePage,
    SelectSitePage,
    LoginPage
  ],
  providers: [Account, Settings, SiteFactory, FindASiteFactory, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
