import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SitesPage } from '../sites/sites';
import { AboutPage } from '../about/about';
import { SelectSitePage } from '../find-a-site/select-site/select-site';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SitesPage;
  tab3Root: any = AboutPage;
  tab4Root: any = SelectSitePage;

  constructor() {

  }
}
