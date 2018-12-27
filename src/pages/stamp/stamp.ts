import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, ToastController, Events } from 'ionic-angular';
import { HttpServiceProvider,ShopDetailInfo } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the StampPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stamp',
  templateUrl: 'stamp.html',
})
export class StampPage {

  @ViewChild(Slides) slides: Slides;

  item_page: number[] = [0];
  item_row: number[] = [0, 1];
  item_col: number[] = [1, 2, 3, 4, 5];  
  curr_page: number = 1;

  shopDetailInfo: ShopDetailInfo;
  store_cd: string;
  store_nm: string;
  sessionId: string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider, 
              public DbManager: DbManagerProvider,
              public viewCtrl: ViewController,
              public events: Events,
              public toastCtrl: ToastController ) {    

    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.store_cd = navParams.get('store_cd');  
      console.info("store_cd:" + this.store_cd);

      //가맹점 정보 조회
      this.httpServiceProvider.getShopDetailSearch(this.store_cd).subscribe(data => {

        if(data['RESULT_CODE'] == 'EXPIRED_SESSION'){
          const toast = this.toastCtrl.create({
            message: '세션이 종료되었습니다.',
            duration: 2000
          });
          toast.present();
  
          this.events.publish('session_expire',true);
          return;
        }

        this.shopDetailInfo = data;           
        this.setPageLen();     
      });    
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StampPage');
  }

  closeBarCode(){    
    this.viewCtrl.dismiss();
  } 

  setPageLen(){
    this.item_page = [];

    let len: number = Number.parseInt(this.shopDetailInfo.STAMP_CNT) / (this.item_col.length * this.item_row.length);
    
    if (Number.parseInt(this.shopDetailInfo.STAMP_CNT) % (this.item_col.length * this.item_row.length) > 0){      
      len++;      
    }

    for(var i: number = 1; i <= len; i++){         
      this.item_page.push(i-1);
    } 

    if (this.item_page.length == 0){
      this.item_page = [0];
    }    
  }

  slideChanged() {
    let curr = this.slides.getActiveIndex() + 1;
    if (this.item_page.length < curr){
      curr = this.item_page.length;
    }
    this.curr_page = curr;

    console.log('Current index is', curr);
  }
}
