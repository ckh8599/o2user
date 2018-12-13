import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { HomePage } from '../../pages/home/home';
import { PoolShopDetailPage } from '../../pages/pool-shop-detail/pool-shop-detail';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

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

  imageUrl: string = "http://tb.o2point.co.kr";

  myO2zoneInfo: string[];
  row_count: number;
  page: number;
  sessionId: string;
  showMore: boolean = false;

  item_list: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.row_count = 10;
      this.page = 1;
      this.httpServiceProvider.setSessionId(this.sessionId);
      this.getMyo2ZoneList();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyZonePage');
  }

  getMyo2ZoneList(){
    this.httpServiceProvider.getMyO2ZoneMainSearch(this.row_count,this.page)
    .subscribe(data => {
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
      
      this.page = this.page + 1;
      
    });
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  moreList(){
    this.getMyo2ZoneList();
  };

  openPoolShopDetailPage(pool_cd, pool_service_type){
    this.navCtrl.setRoot(PoolShopDetailPage,{'pool_cd':pool_cd,'pool_service_type':pool_service_type});
  }
}
