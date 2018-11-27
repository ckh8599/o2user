import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { HomePage } from '../../pages/home/home';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';

/**
 * Generated class for the PoolShopDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pool-shop-detail',
  templateUrl: 'pool-shop-detail.html',
  providers: [HttpServiceProvider]
})
export class PoolShopDetailPage {
  poolShopDetailInfo: string[];
  row_count: number;
  page: number;
  sessionId: string;
  pool_cd: string;
  pool_service_type: string;
  location_x: string;
  location_y: string;
  showMore: boolean = false;
  title: string;

  item_list: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
    this.row_count = 10;
    this.page = 1;
    this.sessionId = navParams.get('sessionId');
    this.pool_cd = navParams.get('pool_cd');
    this.pool_service_type = navParams.get('pool_service_type');
    this.location_x = navParams.get('location_x') == null?"37.48569198":navParams.get('location_x');
    this.location_y = navParams.get('location_y') == null?"127.03607113":navParams.get('location_y');
    this.httpServiceProvider.setSessionId(this.sessionId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoolShopDetailPage');
    this.getPoolShopDetail();
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  getPoolShopDetail(){
    this.httpServiceProvider.getPoolShopDetailSearch('http://110.45.199.181/api/myo2zone/PoolShopDetailSearch',this.row_count,this.page,this.pool_cd,this.pool_service_type)
    .subscribe(data => {
      this.poolShopDetailInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');

      console.log('poolShopDetailInfo : '+JSON.stringify(this.poolShopDetailInfo));

      if(this.pool_service_type == '1'){
        this.title = this.poolShopDetailInfo['AVAIL_POINT'] + "P";
      }else{
        this.title = this.poolShopDetailInfo['AVAIL_STAMP'] + "S";
      }

      if(this.item_list != null){
        let poolList: any[] = JSON.parse(JSON.stringify(this.poolShopDetailInfo['POOL_LIST']));
        for(let p of poolList){
          this.item_list.push(p);
        }
      }else{
        this.item_list = JSON.parse(JSON.stringify(this.poolShopDetailInfo['POOL_LIST']));
      }

      
    });
  }

  openShopInfo(store_cd, store_nm){
    this.navCtrl.setRoot(ShopInfoPage,{'store_cd':store_cd,'store_nm':store_nm,'sessionId':this.sessionId});
  }

}
