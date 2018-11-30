import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';

/**
 * Generated class for the ThemaZoneDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thema-zone-detail',
  templateUrl: 'thema-zone-detail.html',
  providers: [HttpServiceProvider]
})
export class ThemaZoneDetailPage {

  sessionId: string;
  thema_seq: string;
  themaZoneInfo: any;
  title: string;
  item_list: any[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
    this.sessionId = navParams.get('sessionId');
    this.thema_seq = navParams.get('thema_seq');
    this.title = navParams.get('title');
    this.httpServiceProvider.setSessionId(this.sessionId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemaZoneDetailPage');
    this.getThemaDetailSearch();
  }

  getThemaDetailSearch(){
    this.httpServiceProvider.getThemaZoneDetailSearch('http://110.45.199.181/api/shop/ThemaZoneDetailSearch', this.thema_seq).subscribe(data => {
      this.themaZoneInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('가맹점 정보 조회 : '+JSON.stringify(this.themaZoneInfo));
        
      this.item_list = JSON.parse(JSON.stringify(this.themaZoneInfo['SHOP_LIST']));
    })
  }

  openShopInfo(store_cd, store_nm){
    this.navCtrl.push(ShopInfoPage,{'store_cd':store_cd,'store_nm':store_nm,'sessionId':this.sessionId});
  }

}
