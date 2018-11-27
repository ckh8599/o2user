import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpServiceProvider {

  //logininfo & sessionId
  session_id: string;
  mdn: string;
  out_pw: string;

  //mainshopList관련
  type: string;
  customer_location_x: string;
  customer_location_y: string;
  row_count: string;
  page: string;

  constructor(public storage: Storage, public http: HttpClient) {
    this.session_id = '';

    this.customer_location_x = '37.48569198';
    this.customer_location_y = '127.03607113';
    this.type = '01';
    this.row_count = '10';
    this.page = '1';
  }

  setSessionId(session_id : string){
    this.session_id = session_id;
  }

  setLoginInfo(mdn : string, out_pw : string){
    this.mdn = mdn;
    this.out_pw = out_pw;
  }

  setMainShopSearchParam(type : string, customer_location_x : string, customer_location_y : string, row_count : string, page : string){
    this.type = type;
    this.customer_location_x = customer_location_x;
    this.customer_location_y = customer_location_y;
    this.row_count = row_count;
    this.page = page;
  }

  // setUrl(url : string){
  //   this.apiPath = url;
  // }

  

  LoginByMdn(url : string) {
    let headers = this.makeHeader();
    let body = {'MDN':this.mdn,'OUT_PW':this.out_pw}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getCustomerInfo(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getCustomerMainInfo(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getBrandInfo(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getBarcodeInfo(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getMainShopListInfo(url : string) {
    let headers = this.makeHeader();
    let body = {'TYPE':this.type,'CUSTOMER_LOCATION_X':this.customer_location_x,'CUSTOMER_LOCATION_Y':this.customer_location_y,'ROW_COUNT':this.row_count,'PAGE':this.page}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  deviceAppCheck(url : string) {
    let headers = this.makeHeader();
    let body = {'DEVICE_TYPE':'001','DEVICE_ID':'869047034485681','DEVICE_TOKEN':'','APP_VERSION':'1.2.4'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getTOSInfo(url : string) {
    let headers = this.makeHeader();
    let body = {'ESSENTIAL_YN':'A','AGREE_YN':'Y'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getPointUseMainSearch(url : string) : Observable<PointUseMainInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getPointUseListSearch(url : string, month: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':month,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getStampUseMainSearch(url : string) : Observable<StampUseMainInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getStampUseListSearch(url : string, month: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':month,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getCashUseMainSearch(url : string) : Observable<CashUseMainInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getCashUseListSearch(url : string, month: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':month,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getShopDetailSearch(url : string, store_cd: string) : Observable<ShopDetailInfo> {
    let headers = this.makeHeader();
    let body = {'SHOP_CD':store_cd,'ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getPoolShopDetailSearch(url : string, row_count: number, page: number,pool_cd: string, pool_service_type: string) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'POOL_CD':pool_cd,'ROW_COUNT':row_count.toString(),'PAGE':page.toString(), 'POOL_SERVICE_TYPE':pool_service_type,'CUSTOMER_LOCATION_X':this.customer_location_x,'CUSTOMER_LOCATION_Y':this.customer_location_y}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getMyO2ZoneMainSearch(url : string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(url,JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getO2CouponListSearch(url : string, coupon_type: string, keyword: string) {
    let headers = this.makeHeader();
    let body = {'COUPON_TYPE':coupon_type,'ROW_COUNT':'10','PAGE':'1', 'KEYWORD':keyword}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getO2MyCouponListSearch(url : string, search_type: string) {
    let headers = this.makeHeader();
    let body = {'SEARCH_TYPE':search_type,'ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getO2MyCouponDetailListSearch(url : string, coupon_seq: string) {
    let headers = this.makeHeader();
    let body = {'COUPON_SEQ':coupon_seq}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getThemaZoneListSearch(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getThemaZoneDetailSearch(url : string, thema_seq: string) {
    let headers = this.makeHeader();
    let body = {'THEMA_SEQ':thema_seq}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getTOSAgreement(url : string, tosList: any) {
    let headers = this.makeHeader();
    let body = {'TOS_LIST':JSON.stringify(tosList)}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  makeHeader() : HttpHeaders{
    // this.storage.get('sessionId').then((val) => {console.log("????? : "+val); this.session_id = val});
    // console.log("=======-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= sessionId : " + this.session_id);

    // this.storage.get('sessionId').then((val) => {  // 저장객체에 데이터가 없을 경우 디폴트 값 처리하기
    //    console.log("=======-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= sessionId : " + val);
    //   if(val != null){
    //     sessionId = val;
    //     console.log("123123123123 sessionId : " + sessionId);
    //   }else{ 
    //     sessionId = '';
    //     console.log("4564456456456 sessionId : " + sessionId);
    //   }

    // });

    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // create header object
        headers = headers.append("Accept", 'application/json');
        headers = headers.append('TRANSACTION_ID', '2018111509170000'); // add a new header, creating a new object
        headers = headers.append('APP_TEST', 'Y'); // add another header
        headers = headers.append('SESSION_ID', this.session_id); // add another header
        return headers;
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
}

export class PointUseMainInfo {
  SAVE_RESERVE_POINT: string;
  RESULT_CODE: string;
  EXIT_RESERVE_POINT: string;
  AVAIL_POINT: string;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}

export class StampUseMainInfo {
  SAVE_RESERVE_STAMP: string;
  RESULT_CODE: string;
  EXIT_RESERVE_STAMP: string;
  AVAIL_STAMP: string;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}

export class CashUseMainInfo {
  SAVE_RESERVE_CASH: string;
  RESULT_CODE: string;
  EXIT_RESERVE_CASH: string;
  AVAIL_CASH: string;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}

export class ShopDetailInfo {
  AVAIL_CASH: string;
  STAMP_CNT: string;
  STAMP_YN: string;
  SHOP_NOTICE_TITLE: string;
  STAMP_CNT2: string;
  SHOP_NM: string;
  STAMP_CNT1: string;
  COUPON_YN: string;
  SHOP_END_TIME: string;
  SHOP_IMG_URL_LIST:
    [
      {
        SHOP_CD: string;
        SHOP_NM: string;
        SHOP_IMG_URL: string;
        IMG_NO: string;
      }
    ];
  STAMP_CNT3: string;
  CASH_SAVE_NOTICE4: string;
  CASH_SAVE_NOTICE2: string;
  CASH_SAVE_NOTICE3: string;
  POINT_YN: string;
  CASH_SAVE_NOTICE1: string;
  POINT_SAVE_NOTICE1: string;
  POINT_SAVE_NOTICE2: string;
  POINT_SAVE_NOTICE3: string;
  POINT_SAVE_NOTICE4: string;
  CASH_POLICY: string;
  EVENT_NOTICE5: string;
  SHOP_RECOMMAND_TITLE: string;
  DISTANCE: string;
  BIZ_CONDITIONS: string;
  SHOP_START_TIME: string;
  EVENT_NOTICE1: string;
  EVENT_NOTICE2: string;
  POOL_CD: string;
  EVENT_NOTICE3: string;
  EVENT_NOTICE4: string;
  STAMP_SAVE_NOTICE1: string;
  SHOP_HOLIDAY: string;
  EVENT_YN: string;
  STAMP_SAVE_NOTICE4: string;
  STAMP_SAVE_NOTICE3: string;
  STAMP_SAVE_NOTICE2: string;
  SHOP_SEQ: string;
  STAMP_TOTAL_CNT: string;
  SHOP_LOCATION_Y: string;
  SHOP_PHONE: string;
  SHOP_LOCATION_X: string;
  STAMP_DESC2: string;
  STAMP_DESC1: string;
  STAMP_DESC3: string;
  SHOP_ADDRESS: string;
  BRND_IMG_URL: string;
  EVENT_NM: string;
  EVENT_NO: string;
  AVAIL_POINT: string;
  SHOP_ADDRESS_DETAIL: string;
  STAMP_POLICY: string;
  POINT_POLICY: string;
  RESULT_CODE: string;
  CASH_YN: string;
  CATEGORY_NM: string;
  CATEGORY_CD: string;
  SHOP_CD: string;
  BRND_CD: string;  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

// export class PointUseListInfo {
//   POOL_LIST: 
//   {
//     TRADE_NM: string,
//     SHOP_CD: string,
//     RNUM: string,
//     POINT_TYPE: string,
//     TRADE_TYPE: string,
//     TRADE_DATE: string,
//     TRADE_POINT: string,
//     POOL_CD: string
//   }[]
//   constructor(values: Object = {}) {
//        Object.assign(this, values);
//   }
// }

