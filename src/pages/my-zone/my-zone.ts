import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { HomePage } from '../../pages/home/home';
import { PoolShopDetailPage } from '../../pages/pool-shop-detail/pool-shop-detail';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

import { ViewChild } from '@angular/core';
import { Scroll } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { BarcodePage } from '../../pages/barcode/barcode';
import { LoadingController, Loading } from 'ionic-angular';
import { ENV } from '@app/env';
/**
 * Generated class for the MyZonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-zone',
  templateUrl: 'my-zone.html',
})
export class MyZonePage {
  @ViewChild('scrollList') scrollList: Scroll;

  imageUrl: string;

  myO2zoneInfo: string[];
  row_count: number;
  page: number;
  sessionId: string;

  loading: Loading;
  showMore: boolean = false;
  scroll_height: number;

  item_list: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.row_count = 10;
      this.page = 1;
      this.httpServiceProvider.setSessionId(this.sessionId);
      this.getMyo2ZoneList();

      //이미지URL설정
      this.imageUrl = ENV.image;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyZonePage');

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

  getMyo2ZoneList(){
    this.httpServiceProvider.getMyO2ZoneMainSearch(this.row_count,this.page)
    .subscribe(data => {
      //로딩제거
      if(this.loading){
        this.loading.dismiss();
      }

      this.myO2zoneInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');

      console.log('myO2zoneInfo : '+JSON.stringify(this.myO2zoneInfo));

      if(this.item_list != null){
        let o2zoneList: any[] = JSON.parse(JSON.stringify(this.myO2zoneInfo['POOL_LIST']));
        for(let o of o2zoneList){
          this.item_list.push(o);
        }
      }else{
        this.item_list = JSON.parse(JSON.stringify(this.myO2zoneInfo['POOL_LIST']));
      }
      
      //더보기 보여줄지말지
      if(this.item_list.length % 10 == 0){
        this.showMore = true;
      }else{
        this.showMore = false;
      }
      
      //스크롤 높이설정
      if(this.page == 1){
        this.scroll_height = (this.item_list.length * 91) + 10;
      }

      this.page = this.page + 1;
      
    });
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  moreList(){
    //로딩설정
    this.loading = this.loadingCtrl.create({
      content: ''
    });
    this.loading.present();

    setTimeout(() => {
      this.getMyo2ZoneList();
    }, 700);
  };

  openPoolShopDetailPage(pool_cd, pool_service_type){
    this.navCtrl.setRoot(PoolShopDetailPage,{'pool_cd':pool_cd,'pool_service_type':pool_service_type});
  }

  openBarCode(){
    let modal = this.modalCtrl.create(BarcodePage, {}, {cssClass: "transactionConfirm-modal"});
    modal.present();        
  }
}
