import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';
import { HttpServiceProvider,PointUseMainInfo,StampUseMainInfo,CashUseMainInfo } from '../../providers/http-service/http-service';
import 'rxjs/add/operator/map';
import { MyZonePage } from '../my-zone/my-zone';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the ServiceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-list',
  templateUrl: 'service-list.html'
})
export class ServiceListPage {
  

  pointType: string;
  title: string;
  seletedMonth: string;
  row_count: number;
  page: number;
  sessionId: string;

  pointUseMainInfo: PointUseMainInfo;
  pointUseListInfo: string[];

  stampUseMainInfo: StampUseMainInfo;
  stampUseListInfo: string[];

  cashUseMainInfo: CashUseMainInfo;
  cashUseListInfo: string[];

  item_list: any[];

  errorMessage: string;

  avail_point: string;
  save_reserve_point: string;
  exit_reserve_point: string;

  avail_stamp: string;
  save_reserve_stamp: string;
  exit_reserve_stamp: string;

  avail_cash: string;
  save_reserve_cash: string;
  exit_reserve_cash: string;

  loading: boolean = false;
  showMore: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.pointType = navParams.get('point_type');
      this.seletedMonth = "1";
      this.row_count = 10;
      this.page = 1;
      
      console.log('param == ' + this.pointType);
      if(this.pointType == 'P') this.title = "Point";
      if(this.pointType == 'S') this.title = "Stamp";
      if(this.pointType == 'C') this.title = "Cash";
  
      this.httpServiceProvider.setSessionId(this.sessionId);
      if(this.pointType == 'P'){
        this.httpServiceProvider.getPointUseMainSearch()
        .subscribe(data => {
            this.pointUseMainInfo = data; 
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('pointUseMainInfo : '+JSON.stringify(data));
    
            this.avail_point = data.AVAIL_POINT;
            this.save_reserve_point = data.SAVE_RESERVE_POINT;
            this.exit_reserve_point = data.EXIT_RESERVE_POINT;
    
            //리스트조회
            this.getPointUseList();
            
          },
          error => this.errorMessage = <any>error
        );
      }else if(this.pointType == 'S'){
        this.httpServiceProvider.getStampUseMainSearch()
        .subscribe(data => {
            this.stampUseMainInfo = data; 
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('stampUseMainInfo : '+JSON.stringify(data));
    
            this.avail_stamp = data.AVAIL_STAMP;
            this.save_reserve_stamp = data.SAVE_RESERVE_STAMP;
            this.exit_reserve_stamp = data.EXIT_RESERVE_STAMP;
    
            //리스트조회
            this.getPointUseList();
            
          },
          error => this.errorMessage = <any>error
        );
      }else if(this.pointType == 'C'){
        this.httpServiceProvider.getCashUseMainSearch()
        .subscribe(data => {
            this.cashUseMainInfo = data; 
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('=========================================================');
            console.log('cashUseMainInfo : '+JSON.stringify(data));
    
            this.avail_cash = data.AVAIL_CASH;
            this.save_reserve_cash = data.SAVE_RESERVE_CASH;
            this.exit_reserve_cash = data.EXIT_RESERVE_CASH;
    
            //리스트조회
            this.getPointUseList();
            
          },
          error => this.errorMessage = <any>error
        );
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceListPage');

  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  onChange(selectedValue: string) {
    console.log('selectedValue == ' + selectedValue);
    this.seletedMonth = selectedValue;

    //셀렉트박스 체인지 이벤트시 페이지 초기화
    this.page = 1;
    this.item_list = [];

    this.getPointUseList();
    
  }

  moreList(){
    this.getPointUseList();
  };

  getPointUseList(){
    if(this.pointType == 'P'){
      this.httpServiceProvider.getPointUseListSearch(this.seletedMonth,this.row_count,this.page)
      .subscribe(data => {
        this.pointUseListInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('pointUseListInfo : '+JSON.stringify(this.pointUseListInfo));

        if(this.item_list != null){
          let pointList: any[] = JSON.parse(JSON.stringify(this.pointUseListInfo['POOL_LIST']));
          for(let p of pointList){
            this.item_list.push(p);
          }
        }else{
          this.item_list = JSON.parse(JSON.stringify(this.pointUseListInfo['POOL_LIST']));
        }

        //더보기 보여줄지말지
        if(this.item_list.length % 10 == 0){
          this.showMore = true;
        }else{
          this.showMore = false;
        }
        
        this.page = this.page + 1;
      });
    }else if(this.pointType == 'S'){
      this.httpServiceProvider.getStampUseListSearch(this.seletedMonth,this.row_count,this.page)
      .subscribe(data => {
        this.stampUseListInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('stampUseListInfo : '+JSON.stringify(this.stampUseListInfo));

        if(this.item_list != null){
          let stampList: any[] = JSON.parse(JSON.stringify(this.stampUseListInfo['STAMP_LIST']));
          for(let s of stampList){
            this.item_list.push(s);
          }
        }else{
          this.item_list = JSON.parse(JSON.stringify(this.stampUseListInfo['STAMP_LIST']));
        }

        //더보기 보여줄지말지
        if(this.item_list.length % 10 == 0){
          this.showMore = true;
        }else{
          this.showMore = false;
        }
        
        this.page = this.page + 1;
      });
    }else if(this.pointType == 'C'){
      this.httpServiceProvider.getCashUseListSearch(this.seletedMonth,this.row_count,this.page)
      .subscribe(data => {
        this.cashUseListInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('cashUseListInfo : '+JSON.stringify(this.cashUseListInfo));

        if(this.item_list != null){
          let cashList: any[] = JSON.parse(JSON.stringify(this.cashUseListInfo['CASH_LIST']));
          for(let c of cashList){
            this.item_list.push(c);
          }
        }else{
          this.item_list = JSON.parse(JSON.stringify(this.cashUseListInfo['CASH_LIST']));
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
  }

  openShopInfo(store_cd, store_nm){
    this.navCtrl.push(ShopInfoPage,{'store_cd':store_cd,'store_nm':store_nm});
  }
  myO2zone(){
    this.navCtrl.push(MyZonePage);
  }

}