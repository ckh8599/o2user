import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CertificationConfirmPage } from '../../pages/certification-confirm/certification-confirm';

/**
 * Generated class for the CertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certification',
  templateUrl: 'certification.html',
})
export class CertificationPage {

  exceptionAlert: string;
  formGroup: FormGroup;

  mPath: number;
  sPath: number;
  interval;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = new FormGroup({
      cell: new FormControl('',Validators.required),
      auth: new FormControl('',Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationPage');
    console.log(this.interval);

    this.exceptionAlert = '';
  }

  //초 분 함수
  startTimer() {
    this.interval = setInterval(() => {
      if(this.sPath > 0 ) {
        this.sPath--;
      } else if (this.mPath > 0) {
        this.mPath--;
        this.sPath = 59;
      }
    },1000)
  }

  sendSms(){
    
    if(this.interval != undefined)  clearInterval(this.interval);
    this.mPath = 2;
    this.sPath = 59;
    this.startTimer();
  }

  confirm(){
    this.navCtrl.setRoot(CertificationConfirmPage);
  }

}
