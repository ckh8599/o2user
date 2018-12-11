import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

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
  findIdInfo: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
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

    this.httpServiceProvider.iDSearch(this.formGroup.get('username').value, this.formGroup.get('email').value).subscribe(data => {
      var findIdInfo = data;
      console.log('FindIdPage confirm : '+JSON.stringify(findIdInfo));

      if(findIdInfo['RESULT_CODE'] == 'INVALID_USER'){
        console.log('FindIdPage confirm : '+JSON.stringify(findIdInfo));
      }else{

        this.exceptionAlert = '등록된 사용자가 아닙니다. 회원가입을 해주시기 바랍니다.';
      }
    });
  }
}
