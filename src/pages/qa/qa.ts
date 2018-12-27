import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the QaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qa',
  templateUrl: 'qa.html',
})
export class QaPage {

  sessionId : string;
  url: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer, public DbManager: DbManagerProvider) {   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QaPage');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://tb.o2point.co.kr/web/customerCenter/customerView?session_id='+this.sessionId);
      console.info(this.url);
    });
  }


  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
