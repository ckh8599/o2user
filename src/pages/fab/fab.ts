import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { FlipModule } from 'ngx-flip';

import { BarcodePage } from '../../pages/barcode/barcode';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { HomePage } from '../home/home';

import { ViewChild } from '@angular/core';
import { Scroll } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
import { ENV } from '@app/env';

@IonicPage()
@Component({
  selector: 'page-fab',
  templateUrl: 'fab.html'
})
export class FabPage {
  @ViewChild('scrollList') scrollList: Scroll;

  imageUrl: string;

  btn_tab_1 = 'n';
  btn_tab_2 = 'n';
  btn_tab_3 = 'n';
  btn_tab_4 = 'n';
  btn_tab;
  flipDiv = false;
  title;
  sessionId: string;
  mainShopListInfo: any;
  item_list: any[];
  row_count: number;
  page: number;
  flipArr: any[];
  
  loading: Loading;
  showMore: boolean;
  scroll_height: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              public modalCtrl: ModalController, 
              public loadingCtrl: LoadingController,
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider) {
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.btn_tab = navParams.get('btn_tab_number') == null?'01':navParams.get('btn_tab_number');
      this.changeFab(this.btn_tab);

      //이미지URL설정
      this.imageUrl = ENV.image;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FabPage');

    //add list scroll listener
    if(this.scrollList){
      this.scrollList.addScrollEventListener((event) => {
        //console.log("offset height : " + event.target.offsetHeight);
        //console.log("scroll top: " + event.target.scrollTop);
        //console.log("scroll height: " + event.target.scrollHeight);

        if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
          //console.log("=== bottom ====");
          if(this.showMore){
            this.moreList();
          }
        }
      });
    }
  }

  closeFab(){
    this.navCtrl.setRoot(HomePage,{'btn_tab_number':this.btn_tab});
    // this.navCtrl.pop();
  }

  moreList(){
    //로딩설정
    this.loading = this.loadingCtrl.create({
      content: ''
    });
    this.loading.present();

    setTimeout(() => {
      this.getMainShopList();
    }, 700);
  };

  getMainShopList(){
    //가맹점 정보 조회
    console.log(this.btn_tab);
    this.httpServiceProvider.getMainShopListInfo(this.btn_tab, this.page.toString(), this.row_count.toString()).subscribe(data => {
      //로딩제거
      if(this.loading){
        this.loading.dismiss();
      }

      this.mainShopListInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('가맹점 정보 조회 : '+JSON.stringify(this.mainShopListInfo));

      if(this.item_list != null){
        let shopList: any[] = JSON.parse(JSON.stringify(this.mainShopListInfo['SHOP_LIST']));
        for(let s of shopList){
          console.log(s);
          // s.push(flipVal);
          s.FLIP_YN = 'Y';
          this.item_list.push(s);
        }
      }else{
        this.item_list = JSON.parse(JSON.stringify(this.mainShopListInfo['SHOP_LIST']));
      }

      //더보기 보여줄지말지
      if(this.item_list.length % 10 == 0){
        this.showMore = true;
      }else{
        this.showMore = false;
      }
      
      //스크롤 높이설정
      if(this.page == 1){
        let num = Math.ceil(this.item_list.length / 2);
        this.scroll_height = (num * 260) + 50;
      }

      this.page = this.page + 1;
    });
  }

  changeFab(btn_tab_number){
    this.page = 1;
    this.row_count = 10;
    this.item_list = [];
    this.flipArr =[];

    this.btn_tab_1 = 'n';
    this.btn_tab_2 = 'n';
    this.btn_tab_3 = 'n';
    this.btn_tab_4 = 'n';
    this.btn_tab = btn_tab_number;
    if(this.btn_tab == '01') { this.btn_tab_1 = 's'; this.title = '추천 매장'; }
    if(this.btn_tab == '02') { this.btn_tab_2 = 's'; this.title = '자주가는 매장'; }
    if(this.btn_tab == '03') { this.btn_tab_3 = 's'; this.title = '주변 매장'; }
    if(this.btn_tab == '04') { this.btn_tab_4 = 's'; this.title = '이벤트'; }

    this.getMainShopList();
  }

  changeFlip(selItem){
    console.log(selItem);
    if(selItem.flip){
      selItem.flip = false;
    }else{
      selItem.flip = true;
    }
  }

  getFlipCheck(seq){
    console.log('누를때 오기만하면 됨');
    if(this.flipArr != null && this.flipArr.indexOf(seq) !== -1 ){
      return true;
    }else{
      return false;
    }
    //카드 선택시 배열에서 존재하면 삭제 미존재시 추가
    
  }

  openShopInfo(store_cd, store_nm){
    this.navCtrl.push(ShopInfoPage,{'store_cd':store_cd,'store_nm':store_nm});
  }

  openBarCode(){
    let modal = this.modalCtrl.create(BarcodePage, {}, {cssClass: "transactionConfirm-modal"});
    modal.present();        
  }

}