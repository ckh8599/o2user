import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the TosDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tos-detail',
  templateUrl: 'tos-detail.html'
})
export class TosDetailPage {

  sessionId: string;
  title: string;
  url: SafeResourceUrl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider, 
              public DbManager: DbManagerProvider,
              public sanitizer: DomSanitizer) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.title = navParams.get('title');
      this.httpServiceProvider.setSessionId(this.sessionId);
      this.url = sanitizer.bypassSecurityTrustResourceUrl(navParams.get('url'));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TosDetailPage');
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
