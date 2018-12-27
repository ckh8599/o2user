import { Component, ViewChild, isDevMode, enableProdMode } from '@angular/core';
import { Nav, Platform, ModalController, AlertController, Events, Slides, LoadingController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ServiceListPage } from '../pages/service-list/service-list';
import { HomePage } from '../pages/home/home';
import { MyZonePage } from '../pages/my-zone/my-zone';
import { MyZoneListPage } from '../pages/my-zone-list/my-zone-list';
import { FindShopPage } from '../pages/find-shop/find-shop';
import { EventPage } from '../pages/event/event';
import { QaPage } from '../pages/qa/qa';
import { InformationPage } from '../pages/information/information';
import { CouponPage } from '../pages/coupon/coupon';
import { ConfigPage } from '../pages/config/config';

import { LoginPage } from '../pages/login/login';

import { HttpServiceProvider } from '../providers/http-service/http-service';

import 'rxjs/add/operator/map';
import { ShopInfoPage } from '../pages/shop-info/shop-info';

import { NgxBarcodeModule } from 'ngx-barcode';

import { BarcodePage } from '../pages/barcode/barcode';

import { Dialogs } from '@ionic-native/dialogs';
import { PoolShopDetailPage } from '../pages/pool-shop-detail/pool-shop-detail';
import { DbManagerProvider } from '../providers/db-manager/db-manager';
import { ENV } from "@app/env";
import { Diagnostic } from '@ionic-native/diagnostic';
import { RegisterPage } from '../pages/register/register';

import { SafePasswordRegPage } from '../pages/safe-password-reg/safe-password-reg';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Slides) slides: Slides;

  rootPage: any = LoginPage;
  // rootPage: any = RegisterPage;
  sessionId: string;

  deviceCheckData: any;
  loginInfo: any;
  customerInfo: any;
  customerMainInfo: any;
  barcodeInfo: any;
  mainShopListInfo: any;
  TOSInfo: any;
  poolList: PoolList[];
  poolPages: number[] = [];
  barcode: any;

  //고객정보
  customer_nm: string;
  //보유포인트정보
  avail_point: string;
  avail_cash: string;
  avail_stamp: string;

  tos_push_yn = 'N';
  tos_marketing_yn = 'N';
  tos_location_yn = 'N';
  mdn: string;
  out_pw: string;

  dbData: any;
  mode: string;

  imageUrl: string;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public DbManager: DbManagerProvider, 
              public modalCtrl: ModalController, 
              public httpServiceProvider: HttpServiceProvider,
              public ngxBarcodeModule: NgxBarcodeModule,
              public dialogs: Dialogs,
              public Alert: AlertController,
              public events: Events,
              private androidPermissions: AndroidPermissions,                
              private diagnostic: Diagnostic,
              private loadingController  : LoadingController              
              ) {

    let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    let errorCallback = (e) => console.error(e);

    //카메라 사용가능한 기기인지 등등 앱사용에 필요한거 기본체크들
    this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);

    this.diagnostic.isBluetoothAvailable().then(successCallback, errorCallback);

    //앱실행시 권한체크 하여 필요한항목 미허용시 앱 종료시킴(안드로이드 우선적용 ios 추후 확인필요)
    if(this.platform.is('android')){
      //전화걸기 및 관리(핸드폰 데이터 리딩 권한)
      this.diagnostic.requestRuntimePermission(this.diagnostic.permission.READ_PHONE_STATE)
      .then(state => {
        if(state == this.diagnostic.permissionStatus.GRANTED){
          //위치기반 권한 사용관련. 미수락시 위치기반 검색불가. 앱은 실행가능
          this.diagnostic.requestRuntimePermission(this.diagnostic.permission.ACCESS_FINE_LOCATION)
          .then(state => {
            if(state == this.diagnostic.permissionStatus.GRANTED){
              this.initializeApp();
            }else{
              this.dialogs.alert("위치 정보 사용을 승인하지 않아 가까운 매장정보를 이용할 수 없습니다. 위치 정보 승인은 '설정'에서 승인 할 수 있습니다.","권한").then(idx =>{

                this.initializeApp();
              });
            }
          })
          .catch(err => console.error(err));
        }else{
          this.dialogs.alert('전화걸기 및 관리를 거부하시는 경우 앱 실행이 되지 않습니다.','권한').then(idx => {
            
            this.platform.exitApp();
          });
        }
      })
      .catch(err => console.error(err));
    }else{
      this.initializeApp();
    }

    //이미지URL설정
    this.imageUrl = ENV.image;
  }  

  openBarcodeModal() {    
    let modal = this.modalCtrl.create(BarcodePage, {}, {cssClass: "transactionConfirm-modal"});
    modal.present();     
  }

  getBaseInfo() {
    let loader = this.loadingController.create({
      content: "Please wait.."
    });  
    loader.present();
    //고객기본정보조회
    this.httpServiceProvider.getCustomerInfo().subscribe(data => {
      this.customerInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 기본정보 조회 : '+JSON.stringify(this.customerInfo));
      this.customer_nm = this.customerInfo['CUSTOMER_NM'];
    })

    //디바이스 체크
    this.httpServiceProvider.deviceAppCheck().subscribe(data => {
      this.deviceCheckData = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('디바이스 체크 : '+JSON.stringify(this.deviceCheckData));
    })

    //고객 포인트 캐시 정보 조회
    this.httpServiceProvider.getCustomerMainInfo().subscribe(data => {
      this.customerMainInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 포인트 캐시 정보 조회 : '+JSON.stringify(this.customerMainInfo));

      this.avail_point = this.customerMainInfo['AVAIL_POINT'];
      this.avail_stamp = this.customerMainInfo['AVAIL_STAMP'];
      this.avail_cash = this.customerMainInfo['AVAIL_CASH'];
      this.poolList = this.customerMainInfo['POOL_LIST'];

      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('풀리스트 정보 : ' + JSON.stringify(this.poolList));
      if(this.poolList != null){
        let currPage: number = 0;
        let perPage: number = 4;
        let totalPage: number = this.poolList.length / perPage;             
        if (this.poolList.length % perPage > 0) {totalPage++;}      
        for(var i = 0; i < this.poolList.length; i++){
          this.poolList[i].PAGE_NUM = currPage;          
          console.log('풀리스트 상세 보유스탬프 : ' + this.poolList[i].AVAIL_STAMP);
          console.log('풀리스트 상세 보유캐시 : ' + this.poolList[i].AVAIL_CASH);
          console.log('풀리스트 상세 보유포인트 : ' + this.poolList[i].AVAIL_POINT);
          console.log('풀리스트 상세 브랜드코드 : ' + this.poolList[i].BRND_CD);
          console.log('풀리스트 상세 브랜드명 : ' + this.poolList[i].BRND_NM);
          console.log('풀리스트 상세 페이지번호 : ' + this.poolList[i].PAGE_NUM);
          if ((i+1) % perPage == 0){ currPage++;}          
        }                
        for(var i: number = 1; i < totalPage; i++){                              
          this.poolPages.push(i-1);
        } 
      }
    })

    //고객 바코드정보 조회
    this.httpServiceProvider.getBarcodeInfo().subscribe(data => {
      this.barcodeInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 바코드 정보 조회 : '+JSON.stringify(this.barcodeInfo));

      this.barcode = this.barcodeInfo['BARCODE'];
      if(this.barcodeInfo['RESULT_CODE'] == '0'){
        this.DbManager.setData('save_barcode',this.barcode).then(data => {console.log(data)});
      }
    })

    //가맹점 정보 조회
    this.httpServiceProvider.getMainShopListInfo('01','1','10','').subscribe(data => {
      this.mainShopListInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('가맹점 정보 조회 : '+JSON.stringify(this.mainShopListInfo));
    })

    //고객 정책동의여부 조회
    this.httpServiceProvider.getTOSInfo().subscribe(data => {
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
            this.tos_location_yn = 'Y';
          }
          if(t.TYPE == 'O2P05' && t.AGREE_YN == 'Y'){
            this.tos_marketing_yn = 'Y';
          }
          if(t.TYPE == 'O2P06' && t.AGREE_YN == 'Y'){
            this.tos_push_yn = 'Y';
          }
        }
      }
    })

    this.slideChanged();

    loader.dismiss();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.dialogs.alert(this.platform.platforms().toString());
      // if(this.platform.is('android')){
      //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
      //     result => console.log('Has permission?',result.hasPermission),
      //     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
      //   );
        
      //   this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_PHONE_STATE]);
      // }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.DbManager.getData('autoLogin').then(data => {
        console.log(data);
        if(data == 'Y'){
          this.DbManager.getData('save_auth').then(data2 => {
            console.log("자동로그인 데이터? : "+data2.save_out);
            let save_out = data2.save_out == null?'':data2.save_out;
    
            this.httpServiceProvider.LoginByToken(save_out).subscribe(data => {
              this.loginInfo = data;
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('로그인 정보 : '+JSON.stringify(this.loginInfo));
              // this.sessionId = this.loginInfo['SESSION_ID'];
    
              if(this.loginInfo['RESULT_CODE'] == '0'){
                this.DbManager.setData('sessionId',this.loginInfo['SESSION_ID']).then(data => {
                    this.events.publish('isLogin',true);
                });
              }else{
                //자동로그인 실패시 처리필요
                if(!this.platform.is('core') && !this.platform.is('mobileweb')){
                  this.dialogs.alert('자동로그인 실패');
                }else{
                  alert('자동로그인 실패');
                }
                
              }
    
    
              
            });
          });
  
        }
      });

      this.events.subscribe('isLogin', res => {
        let isLogin = res;
        if(isLogin){
          //this.rootPage = ConfigPage;
          this.DbManager.getData('sessionId').then(data => {
            this.httpServiceProvider.setSessionId(data);
            this.sessionId = data;
            console.log(data);
            this.getBaseInfo();
            this.nav.setRoot(HomePage);            
          });
        }
      });

    });
  }

  openServiceList(param) {this.nav.push(ServiceListPage,{'point_type':param});}
  openMyZone(param) { this.nav.push(MyZonePage);}
  openMyZoneList() { this.nav.push(MyZoneListPage);}
  openFindShop() { this.nav.push(FindShopPage);}
  openEvent() { this.nav.push(EventPage);}
  openQa() { this.nav.push(QaPage);}
  openInformation() { this.nav.push(InformationPage);}
  openCoupon() { this.nav.push(CouponPage);}
  openConfig() { 
    console.log(this.tos_location_yn+ " - "+this.tos_marketing_yn+" - "+this.tos_push_yn);
    console.log(this.sessionId);
    this.nav.push(ConfigPage,{'tos_push_yn':this.tos_push_yn,'tos_location_yn':this.tos_location_yn,'tos_marketing_yn':this.tos_marketing_yn});
  }
  openShopInfo(){this.nav.push(ShopInfoPage);}

  openPoolShopDetailPage(pool_cd, pool_service_type){
    console.info("pool_cd:" + pool_cd);
    console.info("pool_service_type:" + pool_service_type);
    if (pool_cd != null && pool_service_type != null){
      this.nav.push(PoolShopDetailPage,{'pool_cd':pool_cd,'pool_service_type':pool_service_type});
    }    
  }

  myO2zone(){
    this.nav.push(MyZonePage);
  }  

  getPoolItems(currPageNum: number){    
    let items: PoolList[] = [];    
    var nf = new Intl.NumberFormat();
    for(var i = 0; i < this.poolList.length; i++){          
      if(this.poolList[i].PAGE_NUM == currPageNum){        
        this.poolList[i].IS_ACTIVE = true;                        
        items.push(this.poolList[i]);
      }                 
    }       

    let diff = 4 - items.length;
    if (diff > 0){
      for(var i = 0; i < diff; i++){
        let item : PoolList = new PoolList;
        item.IS_ACTIVE = false;
        item.AVAIL_POINT = "0";
        items.push(item);
      }
    }
    return items;
  }

  slideChanged() {
    try{
      let currentIndex = this.slides.getActiveIndex();
      this.slides.update();
      this.slides.slideTo(currentIndex);    
    }catch(err){
      console.info(err);
    }    
  } 

  /*
  openServiceList(param) { this.modalCtrl.create(ServiceListPage,{'param':param}).present();}
  openMyZone(param) { this.modalCtrl.create(MyZonePage).present();}
  openMyZoneList() { this.modalCtrl.create(MyZoneListPage).present();}
  openFindShop() { this.modalCtrl.create(FindShopPage).present();}
  openEvent() { this.modalCtrl.create(EventPage).present();}
  openQa() { this.modalCtrl.create(QaPage).present();}
  openInformation() { this.modalCtrl.create(InformationPage).present();}
  openCoupon() { this.modalCtrl.create(CouponPage).present();}
  openConfig() { this.modalCtrl.create(ConfigPage).present();}
  */
}

class PoolList{
  AVAIL_STAMP: string;
  BRND_CNT: string;
  AVAIL_CASH: string;
  BRND_IMG_URL: string;
  BRND_CD: string;
  POOL_SERVICE_TYPE: string;
  BRND_NM: string;
  POOL_TYPE: string;
  AVAIL_POINT: string;
  POOL_NM: string;
  POOL_CD: string;
  PAGE_NUM: number;
  IS_ACTIVE: boolean;
}