import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { FindIdDetailPage } from '../../pages/find-id-detail/find-id-detail';


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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider,
    public events: Events,
    public toastCtrl: ToastController) {
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

      if(data['RESULT_CODE'] == 'EXPIRED_SESSION'){
        const toast = this.toastCtrl.create({
          message: '인증번호가 발송되었습니다.',
          duration: 2000
        });
        toast.present();

        this.events.publish('session_expire',true);
        return;
      }
      
      var findIdInfo = data;
      var customerInfo:any[] = JSON.parse(JSON.stringify(findIdInfo['MDN_LIST']));
      
      console.log('FindIdPage confirm : '+JSON.stringify(findIdInfo));
      console.log('FindIdPage confirm : '+JSON.stringify(customerInfo[0]));
      console.log('FindIdPage confirm : '+customerInfo[0]['MDN']);
      
      if(findIdInfo['RESULT_CODE'] == '0'){
        this.navCtrl.setRoot(FindIdDetailPage,{'message':customerInfo[0]['MDN']});
      }else if(findIdInfo['RESULT_CODE'] == 'INVALID_USER'){
        console.log('FindIdPage confirm : '+JSON.stringify(findIdInfo));
        this.exceptionAlert = '등록된 사용자가 아닙니다. 회원가입을 또는 고객센터로 문의해 주시기 바랍니다.';

      }else{
        this.exceptionAlert = '등록된 사용자가 아닙니다. 회원가입을 해주시기 바랍니다.';
      }
    });
  }
}
