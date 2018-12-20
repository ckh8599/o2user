import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';

import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { Dialogs } from '@ionic-native/dialogs';
import { ThemaZoneDetailPage } from '../../pages/thema-zone-detail/thema-zone-detail';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { ENV } from '@app/env';
/**
 * Generated class for the FindShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-shop',
  templateUrl: 'find-shop.html'  
})
export class FindShopPage { 

  findShop = 'find';
  search_type: string;
  keyword: string;
  locate_header_text: string;
  locate_tail_text: string;
  locate_header_arr: any[];
  locate_tail_arr: string[];
  category_cd: string;

  sessionId: string;

  row_count: number;
  page: number;
  shopList: string[];

  themaZoneList: string[];

  item_list: any[];
  thema_item_list: any[];

  showMore: boolean = false;

  imageUrl: string;

  constructor(public dialogs: Dialogs, 
              public platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.search_type = '02';
      this.keyword = "";
      this.row_count = 10;
      this.page = 1;
      this.locate_header_text = '';
      this.locate_tail_text = '';
      this.category_cd='';
  
      this.locate_header_arr = [
      {"locate_cd":"00","locate_text":"강원도"},
      {"locate_cd":"01","locate_text":"경기도"},
      {"locate_cd":"02","locate_text":"경상남도"},
      {"locate_cd":"03","locate_text":"경상북도"},
      {"locate_cd":"04","locate_text":"광주광역시"},
      {"locate_cd":"05","locate_text":"대구광역시"},
      {"locate_cd":"06","locate_text":"대전광역시"},
      {"locate_cd":"07","locate_text":"부산광역시"},
      {"locate_cd":"08","locate_text":"서울특별시"},
      {"locate_cd":"09","locate_text":"세종특별자치시"},
      {"locate_cd":"10","locate_text":"울산광역시"},
      {"locate_cd":"11","locate_text":"인천광역시"},
      {"locate_cd":"12","locate_text":"전라남도"},
      {"locate_cd":"13","locate_text":"전라북도"},
      {"locate_cd":"14","locate_text":"제주특별자치도"},
      {"locate_cd":"15","locate_text":"충청남도"},
      {"locate_cd":"16","locate_text":"충청북도"}];
      
      //이미지URL설정
      this.imageUrl = ENV.image;

      this.getShopList();      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindShopPage');

  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openShopInfo(store_cd, store_nm){
    this.navCtrl.push(ShopInfoPage,{'store_cd':store_cd,'store_nm':store_nm});
  }

  themaDetailInfo(thema_seq, thema_nm){
    this.navCtrl.push(ThemaZoneDetailPage,{'thema_seq':thema_seq, 'title':thema_nm});
  }

  onSelect(type){
    if(type.value == '01'){
      this.locate_header_text = '';
      this.locate_tail_text = '';
      this.search_type ='01';
    }else{
      this.locate_header_text = '';
      this.locate_tail_text = '';
      this.keyword='';
      this.search_type ='02';
    }
    console.log(type);
    console.log(this.search_type);
  }

  changeCategory(event){
    this.category_cd = event;
  }

  onChangeLocateHeader(locate_cd,locate_text){
    this.locate_tail_text = '';
    console.log("selchange :"+locate_cd);
    if(locate_cd){
      this.locate_header_text = locate_text;
      this.locate_tail_arr = this.getLocateTailArr(locate_cd);
    }
  }

  onChangeLocateTail(locate_text: string){
    this.locate_tail_text = locate_text;
    console.log("시군구 : " + locate_text);
  }

  search(){
    this.page = 1;
    this.item_list = [];
    this.getShopList();
  }

  getShopList(){
    let legion_cd = this.locate_header_text+' '+this.locate_tail_text;
    this.httpServiceProvider.getShopListSearch(this.keyword,this.row_count,this.page,this.search_type,legion_cd,this.category_cd).subscribe(data => {
      this.shopList = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('매장 조회 : '+JSON.stringify(this.shopList));

      if(this.item_list != null){
        let shopList: any[] = JSON.parse(JSON.stringify(this.shopList['SHOP_LIST']));
        for(let s of shopList){
          this.item_list.push(s);
        }
      }else{
        this.item_list = JSON.parse(JSON.stringify(this.shopList['SHOP_LIST']));
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

  getMyShopList(){
    this.httpServiceProvider.getThemaZoneListSearch().subscribe(data => {
      this.themaZoneList = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('테마존 조회 : '+JSON.stringify(this.themaZoneList));

      this.thema_item_list = JSON.parse(JSON.stringify(this.themaZoneList['THEMA_LIST']));

    });
  }

  moreList(){
    this.getShopList();
  };

  getLocateTailArr(locate_cd: string): string[]{
    console.log(locate_cd);
    let tailArr: string[] = [];
    switch (locate_cd){
      case '00':
        tailArr = ["강릉시","고성군","동해시","삼척시","속초시","양구군","양양군","영월군","원주시","인제군","정선군","철원군","춘천시","태백시","평창군","홍천군","화천군","횡성군"];
        break ;
      case '01':
        tailArr = ["가평군","고양시 덕양구","고양시 일산동구","고양시 일산서구","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시 분당구","성남시 수정구","성남시 중원구","수원시 권선구","수원시 영통구","수원시 장안구","수원시 팔달구","시흥시","안산시 단원구","안산시 상록구","안성시","안양시 동안구","안양시 만안구","양주시","양평군","여주시","연천군","오산시","용인시 기흥구","용인시 수지구","용인시 처인구","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시"];
        break ;
      case '02':
        tailArr = ["거제시","거창군","고성군","김해시","남해군","밀양시","사천시","산청군","양산시","의령군","진주시","창녕군","창원시 마산합포구","창원시 마산회원구","창원시 성산구","창원시 의창구","창원시 진해구","통영시","하동군","함안군","함양군","합천군"];
        break ;
      case '03':
        tailArr = ["경산시","경주시","고령군","구미시","군위군","김천시","문경시","봉화군","상주시","성주군","안동시","영덕군","영양군","영주시","영천시","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군","포항시 남구","포항시 북구"];
        break ;
      case '04':
        tailArr = ["광산구","남구","동구","북구","서구"];
        break ;
      case '05':
        tailArr = ["남구","달서구","달성군","동구","북구","서구","수성구","중구"];
        break ;
      case '06':
        tailArr = ["대덕구","동구","서구","유성구","중구"];
        break ;
      case '07':
        tailArr = ["강서구","금정구","기장군","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구"];
        break ;
      case '08':
        tailArr = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
        break ;
      case '09':
        tailArr = [""]
        break ;
      case '10':
        tailArr = ["남구","동구","북구","울주군","중구"];
        break ;
      case '11':
        tailArr = ["강화군","계양구","남구","남동구","동구","부평구","서구","연수구","옹진군","중구"];
        break ;
      case '12':
        tailArr = ["강진군","고흥군","곡성군","광양시","구례군","나주시","담양군","목포시","무안군","보성군","순천시","신안군","여수시","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
        break ;
      case '13':
        tailArr = ["고창군","군산시","김제시","남원시","무주군","부안군","순창군","완주군","익산시","임실군","장수군","전주시 덕진구","전주시 완산구","정읍시","진안군"];
        break ;
      case '14':
        tailArr = ["서귀포시","제주시"];
        break ;
      case '15':
        tailArr = ["계룡시","공주시","금산군","논산시","당진시","보령시","부여군","서산시","서천군","아산시","연기군","예산군","천안시 동남구","천안시 서북구","청양군","태안군","홍성군"];
        break ;
      case '16':
        tailArr = ["괴산군","단양군","보은군","영동군","옥천군","음성군","제천시","증평군","진천군","청주시 상당구","청주시 서원구","청주시 청원구","청주시 흥덕구","충주시"];
        break ;

    }
    return tailArr;
  }
      
    
    
    
    
}
