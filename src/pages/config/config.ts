import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [HttpServiceProvider]
})
export class ConfigPage {

  isPush: boolean = false;
  isMarketing: boolean = false;
  isLocation: boolean = false;
  location_tos_no: number;
  marketing_tos_no: number;
  push_tos_no: number;
  sessionId: string;
  TOSInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
    // this.isPush = navParams.get('tos_push_yn') == 'Y'?true:false;
    // this.isMarketing = navParams.get('tos_marketing_yn') == 'Y'?true:false;
    // this.isLocation = navParams.get('tos_location_yn') == 'Y'?true:false;

    this.sessionId = navParams.get('sessionId');
    this.httpServiceProvider.setSessionId(this.sessionId);

    //홈화면 이동시 다시 데이터 불러오거나 스토리지 써야되지만 지금 없으니 임시로 정책 조회
    this.httpServiceProvider.getTOSInfo('http://110.45.199.181/api/customer/TOSSearch').subscribe(data => {
    this.TOSInfo = data;
    console.log('=========================================================');
    console.log('=========================================================');
    console.log('=========================================================');
    console.log('=========================================================');
    console.log('=========================================================');
    console.log('=========================================================');
    console.log('고객 정책동의여부 조회 : '+JSON.stringify(this.TOSInfo));

      if(this.TOSInfo != null){
        let tosList: any[] = JSON.parse(JSON.stringify(this.TOSInfo['TOS_LIST']));
        for(let t of tosList){
          if(t.TYPE == 'O2P04' && t.AGREE_YN == 'Y'){
            this.isLocation = true;
            this.location_tos_no = t.TOS_NO;
          }
          if(t.TYPE == 'O2P05' && t.AGREE_YN == 'Y'){
            this.isMarketing = true;
            this.marketing_tos_no = t.TOS_NO;
          }
          if(t.TYPE == 'O2P06' && t.AGREE_YN == 'Y'){
            this.isPush = true;
            this.push_tos_no = t.TOS_NO;
          }
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');

  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  radioCheck(type,val){
    if(type == '1'){
      if(val == 'Y'){
        this.isPush = true;
      }else{
        this.isPush = false;
      }

      this.httpServiceProvider.setPushUse('http://110.45.199.181/api/setting/PushUse',val)
      .subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('PushUse : '+JSON.stringify(data));

        if(data['RES_CODE'] == '0'){
          console.log("성공");
        }
      });

    }else if(type == '2'){
      if(val == 'Y'){
        this.isMarketing = true;
      }else{
        this.isMarketing = false;
      }

      let tosList = [];
      tosList.push({"TOS_NO":this.marketing_tos_no.toString(),"AGREE_YN":val});
      
      this.httpServiceProvider.setTOSAgreement('http://110.45.199.181/api/customer/TOSAgreement',tosList)
      .subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('setTOSAgreement : '+JSON.stringify(data));

        if(data['RES_CODE'] == '0'){
          console.log("성공");
        }
      });
    }else if(type == '3'){
      if(val == 'Y'){
        this.isLocation = true;
      }else{
        this.isLocation = false;
      }
      let tosList = [];
      tosList.push({"TOS_NO":this.location_tos_no.toString(),"AGREE_YN":val});
      
      this.httpServiceProvider.setTOSAgreement('http://110.45.199.181/api/customer/TOSAgreement',tosList)
      .subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('setTOSAgreement : '+JSON.stringify(data));

        if(data['RES_CODE'] == '0'){
          console.log("성공");
        }
      });
    }
  }

}
