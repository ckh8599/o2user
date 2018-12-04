import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the ChangePwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pw',
  templateUrl: 'change-pw.html',
  providers: [HttpServiceProvider]
})
export class ChangePwPage {

  sessionId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
    this.sessionId = navParams.get('sessionId');
    this.httpServiceProvider.setSessionId(this.sessionId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePwPage');
  }

}
