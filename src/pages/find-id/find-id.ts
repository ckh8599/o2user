import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the FindIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-id',
  templateUrl: 'find-id.html',
})
export class FindIdPage {

  buttonColor: string;
  exceptionAlert: string;
  formGroup: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindIdPage');
    this.buttonColor = 'gray';
    this.exceptionAlert = '';
  }

  confirm(){
    this.exceptionAlert = '가입된 휴대폰 번호가 아닙니다.'
  }
}
