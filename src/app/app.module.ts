import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { FindSitePage } from '../pages/find-a-site/find-site/find-site';
import { SelectSitePage } from '../pages/find-a-site/select-site/select-site';



import { Account } from '../providers/account/account';
import { SiteFactory } from '../providers/site/site';
import { FindASiteFactory } from '../providers/site/find-a-site';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    LoginPage,
    HomePage,
    TabsPage,
    FindSitePage,
    SelectSitePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    LoginPage,
    HomePage,
    TabsPage,
    FindSitePage,
    SelectSitePage
  ],
  providers: [Account, SiteFactory, FindASiteFactory, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
