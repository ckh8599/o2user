import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

  information = 'service';
  sessionId : string;
  url: SafeResourceUrl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public sanitizer: DomSanitizer,
              public DbManager: DbManagerProvider) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.url = sanitizer.bypassSecurityTrustResourceUrl('http://tb.o2point.co.kr/web/agreement/AgreementList?type=tab1');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
