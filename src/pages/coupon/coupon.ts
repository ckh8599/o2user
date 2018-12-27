import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { HttpServiceProvider,O2CouponDetailInfo,O2MyCouponDetailInfo } from '../../providers/http-service/http-service';
import { HomePage } from '../../pages/home/home';
import { Dialogs } from '@ionic-native/dialogs';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { CouponPopPage } from '../../pages/coupon-pop/coupon-pop';

import { ViewChild } from '@angular/core';
import { Scroll } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {
  @ViewChild('scrollList1') scrollList_1: Scroll;
  @ViewChild('scrollList2') scrollList_2: Scroll;

  coupon = 'o2';
  listOrView = 'list';

  sessionId: string;
  keyword: string;

  //쿠폰샵
  couponType: string;
  row_count: number;
  page: number;
  couponList: string[];

  item_list: any[];

  loading_1: Loading;
  showMore_1: boolean = false;
  scroll_height_1: number;

  //my쿠폰함
  search_type: string;
  row_count2: number;
  page2: number;
  couponList2: string[];

  item_list2: any[];

  loading_2: Loading;
  showMore_2: boolean = false;
  scroll_height_2: number;

  o2CouponDetailInfo: O2CouponDetailInfo;

  myCouponDetailInfo: O2MyCouponDetailInfo;

  couponCreateRes: any;
  couponUseRes: any;
  
  constructor(public dialogs: Dialogs, 
              public platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider,
              public modalCtrl: ModalController) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.keyword = "";
      this.row_count = 10;
      this.page = 1;
      this.couponType = "";
  
      this.row_count2 = 10;
      this.page2 = 1;
      this.search_type = "01";

      this.getO2CouponList();
      this.getO2MycouponList();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');

    //add list scroll listener1 (coupon)
    if(this.scrollList_1){
      this.scrollList_1.addScrollEventListener((event) => {
        //console.log("offset height : " + event.target.offsetHeight);
        //console.log("scroll top: " + event.target.scrollTop);
        //console.log("scroll height: " + event.target.scrollHeight);
        
        if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
          //console.log("=== bottom ====");
          if(this.showMore_1){
            this.moreList();
          }
        }
      });
    }

    //add list scroll listener2 (my-coupon)
    if(this.scrollList_2){
      this.scrollList_2.addScrollEventListener((event) => {
        //console.log("offset height : " + event.target.offsetHeight);
        //console.log("scroll top: " + event.target.scrollTop);
        //console.log("scroll height: " + event.target.scrollHeight);
        
        if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
          //console.log("=== bottom ====");
          if(this.showMore_2){
            this.moreList2();
          }
        }
      });
    }
  }

  getO2CouponList(){
    this.httpServiceProvider.getO2CouponListSearch( this.couponType,this.keyword,this.row_count,this.page).subscribe(data => {
      //로딩제거
      if(this.loading_1){
        this.loading_1.dismiss();
      }

      this.couponList = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('O2 쿠폰샵 리스트 조회 : '+JSON.stringify(this.couponList));

      if(this.item_list != null){
        let poolList: any[] = JSON.parse(JSON.stringify(this.couponList['COUPON_LIST']));
        for(let p of poolList){
          this.item_list.push(p);
        }
      }else{
        this.item_list = JSON.parse(JSON.stringify(this.couponList['COUPON_LIST']));
      }

      //더보기 보여줄지말지
      if(this.item_list.length % 10 == 0){
        this.showMore_1 = true;
      }else{
        this.showMore_1 = false;
      }

      //스크롤 높이설정
      if(this.page == 1){
        this.scroll_height_1 = (this.item_list.length * 80);
      }
      //console.log("height : " + this.scroll_height_1);
      
      this.page = this.page + 1;
    });
  }

  getO2MycouponList(){
    this.httpServiceProvider.getO2MyCouponListSearch(this.search_type,this.row_count2,this.page2).subscribe(data => {
      //로딩제거
      if(this.loading_2){
        this.loading_2.dismiss();
      }

      this.couponList2 = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('MY 쿠폰함 리스트 조회 : '+JSON.stringify(this.couponList2));

      if(this.item_list2 != null){
        let poolList2: any[] = JSON.parse(JSON.stringify(this.couponList2['COUPON_LIST']));
        for(let p of poolList2){
          this.item_list2.push(p);
        }
      }else{
        this.item_list2 = JSON.parse(JSON.stringify(this.couponList2['COUPON_LIST']));
      }

      //더보기 보여줄지말지
      if(this.item_list2.length % 10 == 0){
        this.showMore_2 = true;
      }else{
        this.showMore_2 = false;
      }

      //스크롤 높이설정
      if(this.page2 == 1){
        this.scroll_height_2 = (this.item_list2.length * 80);
      }

      this.page2 = this.page2 + 1;
    });
  }

  viewO2Detail(coupon_cd){
    this.httpServiceProvider.getO2CouponDetailSearch(coupon_cd).subscribe(data => {
      this.o2CouponDetailInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('O2 쿠폰샵 쿠폰 상세 조회 : '+JSON.stringify(this.o2CouponDetailInfo));

      if(this.o2CouponDetailInfo['RESULT_CODE'] != null && this.o2CouponDetailInfo['RESULT_CODE'] == "0"){
        this.listOrView = 'view';
      }
    });
  }

  //My쿠폰 상세보기
  viewMyDetail(coupon_seq){
    this.httpServiceProvider.getMyCouponDetailSearch(coupon_seq).subscribe(data => {
      this.myCouponDetailInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('MY 쿠폰함 쿠폰 상세 조회 : '+JSON.stringify(this.myCouponDetailInfo));

      if(this.myCouponDetailInfo['RESULT_CODE'] != null && this.myCouponDetailInfo['RESULT_CODE'] == "0"){
        this.listOrView = 'view';
      }
    });
  }

  onChange(couponType: string) {
    console.log('couponType == ' + couponType);
    this.couponType = couponType;
  }

  onChange2(search_type: string) {
    console.log('search_type == ' + search_type);
    this.search_type = search_type;

    this.search2();
  }

  moreList(){
    //로딩설정
    this.loading_1 = this.loadingCtrl.create({
      content: ''
    });
    this.loading_1.present();

    setTimeout(() => {
      this.getO2CouponList();
    }, 700);
  };
  moreList2(){
    //로딩설정
    this.loading_2 = this.loadingCtrl.create({
      content: ''
    });
    this.loading_2.present();

    setTimeout(() => {
      this.getO2MycouponList();
    }, 700);
  };

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  search(){
    this.page = 1;
    this.item_list = [];
    this.getO2CouponList();
  }

  search2(){
    this.page2 = 1;
    this.item_list2 = [];
    this.getO2MycouponList();
  }

  //상단 탭 클릭시 상세복에서 리스트로 변경
  segmentChange(type){
    if(type == '1'){
      this.search();
    }else{
      this.search2();
    }
    this.listOrView = 'list';
  }

  couponCreate(coupon_cd, shop_nm, coupon_nm, coupon_type){
    if(this.platform.is('core') || this.platform.is('mobileweb')){
      if(confirm('보유 포인트를 사용하여 쿠폰을 구매하시겠습니까?')){
        this.httpServiceProvider.couponCreate(coupon_cd).subscribe(data => {
          this.couponCreateRes = data;
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('쿠폰 구매 응답 : '+JSON.stringify(this.couponCreateRes));

          if(this.couponCreateRes['RESULT_CODE'] != null && this.couponCreateRes['RESULT_CODE'] == "0"){
            alert('쿠폰구매가 완료되었습니다.');
            this.openCouponPop(coupon_type, shop_nm, coupon_nm);
            this.listOrView = 'list';
          }else{
            alert('쿠폰구매에 실패하였습니다. \n계속 발생시 고객센터에 문의해주세요.\nO2포인트 고객센터 : 1644-3271');
          }
        });
      }
    }else{
      this.dialogs.confirm('보유 포인트를 사용하여 쿠폰을 구매하시겠습니까?','쿠폰 구매하기',['확인','취소']).then(idx => {//idx 1이면 ok 2면 cancel
        if(idx == 1){
          this.httpServiceProvider.couponCreate(coupon_cd).subscribe(data => {
            this.couponCreateRes = data;
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('쿠폰 구매 응답 : '+JSON.stringify(this.couponCreateRes));

            if(this.couponCreateRes['RESULT_CODE'] != null && this.couponCreateRes['RESULT_CODE'] == "0"){
              this.dialogs.alert('쿠폰구매가 완료되었습니다.');
              this.openCouponPop(coupon_type, shop_nm, coupon_nm);
              this.listOrView = 'list';
            }else{
              this.dialogs.alert('쿠폰구매에 실패하였습니다. \n계속 발생시 고객센터에 문의해주세요.\nO2포인트 고객센터 : 1644-3271');
            }
          });
        }
      });
    }
    
  }

  openCouponPop(couponType, shopNm, couponNm){
    let modal = this.modalCtrl.create(CouponPopPage, {'couponType':couponType, 'shopNm':shopNm, 'couponNm':couponNm}, {cssClass: "coupon-pop-modal"});
    modal.present();    
  }

  couponUse(coupon_seq){
    if(this.platform.is('core') || this.platform.is('mobileweb')){
      if(confirm('사용하신 쿠폰은\n복구되지 않습니다. \n\n점원만 눌러주세요.')){
        this.httpServiceProvider.couponUse(coupon_seq).subscribe(data => {
          this.couponUseRes = data;
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('=========================================================');
          console.log('쿠폰 사용 응답 : '+JSON.stringify(this.couponUseRes));

          if(this.couponUseRes['RESULT_CODE'] != null && this.couponUseRes['RESULT_CODE'] == "0"){
            alert('쿠폰사용이 완료되었습니다.');
            this.listOrView = 'list';
          }else{
            alert('쿠폰사용에 실패하였습니다. \n계속 발생시 고객센터에 문의해주세요.\nO2포인트 고객센터 : 1644-3271');
          }
        });
      }
    }else{
      this.dialogs.confirm('사용하신 쿠폰은\n복구되지 않습니다. \n\n점원만 눌러주세요.','쿠폰 사용하기',['확인','취소']).then(idx => {//idx 1이면 ok 2면 cancel
        if(idx == 1){
          this.httpServiceProvider.couponUse(coupon_seq).subscribe(data => {
            this.couponUseRes = data;
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('쿠폰 사용 응답 : '+JSON.stringify(this.couponUseRes));
  
            if(this.couponUseRes['RESULT_CODE'] != null && this.couponUseRes['RESULT_CODE'] == "0"){
              this.dialogs.alert('쿠폰사용이 완료되었습니다.');
              this.listOrView = 'list';
            }else{
              this.dialogs.alert('쿠폰사용에 실패하였습니다. \n계속 발생시 고객센터에 문의해주세요.\nO2포인트 고객센터 : 1644-3271');
            }
          });
        }
      });
      
    }
  }

}
