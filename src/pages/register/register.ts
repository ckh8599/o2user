import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { PolicyPage } from '../../pages/policy/policy';
import { SafePasswordRegPage } from '../../pages/safe-password-reg/safe-password-reg';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  mdn: string;
  tosData: any;
  tosList: Array<any>;
  checkMan: boolean;
  checkWoman: boolean;
  authAllCheck: boolean;
  reg_type: string;
  birthCheck: boolean;

  exceptionAlert: string;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.mdn = navParams.get('mdn');
    this.reg_type = navParams.get('reg_type');
    // this.mdn = '01866666666';
    // this.reg_type = '01';
    this.formGroup = new FormGroup({
      pw: new FormControl('', [
                              Validators.required
                              , Validators.maxLength(25)
		                          , Validators.minLength(10)
		                          , Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                            ]),
      pwConfirm: new FormControl('', Validators.required),
      email: new FormControl('', [
                              Validators.required
                              , Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                            ]),
      name: new FormControl('', [
                              Validators.required
                              , Validators.pattern('^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$')
                            ]),
      birth: new FormControl('', [
                              Validators.required
                              , Validators.maxLength(8)
                              , Validators.minLength(8)
                            ])
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.exceptionAlert = '';
    this.checkMan = true;
    this.checkWoman = false;
    this.authAllCheck = false;
    this.birthCheck = false;

    //Tos 리스트 호출
    this.httpServiceProvider.tosSearch('A','A').subscribe(data => {
      this.tosData = data;
      console.log('Tos 정보 : '+JSON.stringify(this.tosData));

      if(this.tosData['RESULT_CODE'] == '0'){
        var tempList = this.tosData['TOS_LIST'];
        this.tosList = new Array();
        //TOS_LIST의 AGREE_YN의 값을 N에서 초기화 한다.
        for (let tosInfo of tempList) {
          tosInfo.AGREE_YN = '';
          this.tosList.push(tosInfo);
        }

      } else {
        const toast = this.toastCtrl.create({
          message: '약관조회중 에러가 발생했습니다. 다시 시도해 주세요.',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  changeMan(){
    if(this.checkMan == true) this.checkWoman = false;
    if(this.checkMan == false) this.checkWoman = true;
  }

  changeWoman(){
    if(this.checkWoman == true) this.checkMan = false;
    if(this.checkWoman == false) this.checkMan = true;
  }

  //약관보기
  openPolicy(tos_no, title){
    console.log("tos_no" + tos_no);
    this.navCtrl.push(PolicyPage, {'tos_no':tos_no, 'title':title});
  }

  //약관 각각 변경
  changeAgreeYn(list, yn){
    list.AGREE_YN = yn;
  }

  changeBirthCheck(checkFlag){
    this.birthCheck = checkFlag;
  }

  checkAge() : boolean{

    var birth:string = this.formGroup.get('birth').value;
    var date = new Date();
    
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth()+1;
    var currentDay = date.getDate();

    var age = currentYear-parseInt(birth.substring(0,4));
    var birthMonth = parseInt(birth.substring(4,6));
    var birthDay = parseInt(birth.substring(6,8));

    if(((birthMonth * 100) + birthDay) > ((currentMonth * 100) + currentDay)) age--;

    return age > 13;
  }

  //회원가입 버튼
  reg(){
    console.log('checkMan -- ' + this.checkMan);
    console.log('checkWoman -- ' + this.checkWoman);
    console.log('formGroup -- ' + this.formGroup);
    console.log('tosList -- ' + this.tosList);
    console.log('birthCheck -- ' +this.birthCheck)

    this.exceptionAlert = '';

    var temp_tos_yn = true;
    var temp_require_tos_yn = true;
    for(let tosInfo of this.tosList){
      if(tosInfo.AGREE_YN != 'Y' && tosInfo.AGREE_YN != 'N'){
        temp_tos_yn = false;
        if(!temp_tos_yn){
          console.log(tosInfo.DESCRIPTION);
        }
      }
      if(tosInfo.ESSENTIAL_YN == 'Y' && tosInfo.AGREE_YN != 'Y'){
        temp_require_tos_yn = false;
        if(!temp_require_tos_yn){
          console.log(tosInfo.DESCRIPTION);
        }
      }
    }

    if(!temp_tos_yn){
      this.exceptionAlert = '약관을 체크해 주세요.';
      return;
    } else if (!temp_require_tos_yn){
      this.exceptionAlert = '(필수) 약관을 동의해 주세요.';
      return;
    } else if (!this.birthCheck){
      this.exceptionAlert = '만 14세 이상 동의해 주세요.';
      return;
    } else if(!this.checkAge()){
      this.exceptionAlert = '14세 미만 고객님께서는 회원 가입을 하실 수 없습니다.';
      return;
    }

    /*
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    */
    
    var sex_cd = '2';
    if(this.checkMan == true) sex_cd = '1';

    this.navCtrl.setRoot(SafePasswordRegPage, {'mdn': this.mdn
                                            , 'reg_type': this.reg_type
                                            , 'sex_cd': sex_cd
                                            , 'pw': this.formGroup.get('pw').value
                                            , 'email': this.formGroup.get('email').value
                                            , 'name': this.formGroup.get('name').value
                                            , 'birth': this.formGroup.get('birth').value
                                            , 'tosList': this.tosList});
  }

  isMatching(group: FormGroup){

    console.log("password check");

    var pw = group.controls['pw'].value;
    var pwConfirm = group.controls['pwConfirm'].value;
    if((pw && pwConfirm) && (pw != pwConfirm)){
      console.log("mismatch");
      return { "pw_mismatch": true };
    } else{
      return null;
    }
  }

  static MatchPassword(AC: AbstractControl) {
    const pw = AC.get('pw').value // to get value in input tag
    const pwConfirm = AC.get('pwConfirm').value // to get value in input tag
     if(pw != pwConfirm) {
         console.log('false');
         AC.get('pwConfirm').setErrors( { MatchPassword: true } )
     } else {
         console.log('true');
         AC.get('pwConfirm').setErrors(null);
     }
  }

  //약관 전체 동의
  changeAllCheck(){
    var temp_tos_yn = 'N';
    if(this.authAllCheck) {
      temp_tos_yn = 'Y';
    }
    for(let tosInfo of this.tosList){
      tosInfo.AGREE_YN = temp_tos_yn;
    }
  }

}
