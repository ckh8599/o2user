import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ENV } from "@app/env";

// declare var CryptoJS:any;

@Injectable()
export class HttpServiceProvider {

  //logininfo & sessionId
  session_id: string;
  // mdn: string;
  // out_pw: string;

  //mainshopList관련
  type: string;
  customer_location_x: string;
  customer_location_y: string;
  row_count: string;
  page: string;
  isDevMode: boolean;
  API_URL: string;

  constructor(public storage: Storage, public http: HttpClient) {
    this.isDevMode = isDevMode();
    console.log("env?"+ENV.api);
    console.log("env?"+ENV.mode);
    this.API_URL = ENV.api;
    this.session_id = '';

    this.customer_location_x = '37.726263';
    this.customer_location_y = '127.046953';
    this.type = '01';
    this.row_count = '10';
    this.page = '1';
  }

  setSessionId(session_id : string){
    this.session_id = session_id;
  }

  setLocation(location_x : string, location_y : string){
    this.customer_location_x = location_x;
    this.customer_location_y = location_y;
  }

  setMainShopSearchParam(type : string, customer_location_x : string, customer_location_y : string, row_count : string, page : string){
    this.type = type;
    this.customer_location_x = customer_location_x;
    this.customer_location_y = customer_location_y;
    this.row_count = row_count;
    this.page = page;
  }

  // setUrl(url : string){
  //   this.API_URL = url;
  // }

  LoginByMdn(mdn: string, out_pw: string) {
    let headers = this.makeHeader();
    let body = {'MDN':mdn,'OUT_PW':out_pw};

     //let key:string = 'spco2point_encrypt@';
     //let iv = '1911202416125011';
     //let iv = new Buffer('1911202416125011');

     //SeedCbcCipher.java:958 null
     //let encData = CryptoJS.SEED.encrypt(JSON.stringify(body), key, {iv:iv, mode: CryptoJS.mode.CBC}).toString();
     //SeedCbcCipher.java:958 null
     //let encData = CryptoJS.SEED.encrypt(JSON.stringify(body), key, {iv:iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
     //let encData = CryptoJS.SEED.encrypt(JSON.stringify(body), key, iv).toString();
     //let encData = CryptoJS.SEED.encrypt(JSON.stringify(body), key, {iv:iv}).toString();
     //let encData = CryptoJS.SEED.decrypt(JSON.stringify(body), key, {iv:iv }).toString(CryptoJS.enc.Utf8);

     //let encData = CryptoJS.SEED.encrypt(CryptoJS.enc.Hex.parse(JSON.stringify(body)), CryptoJS.enc.Hex.parse(key), {iv:iv}).toString();

     //let temp = {'ENCRYPT_DATA':btoa(encData)};
     //let temp = {'ENCRYPT_DATA':encData};
     //console.log(encData);
     //console.log(decData);
        
    return this.http.post(this.API_URL + '/customermain/LoginByMdn', JSON.stringify(body), {headers: headers});
  }

  LoginByToken(token: string) {
    let headers = this.makeHeader();
    let body = {'OUT':token}

    return this.http.post(this.API_URL+"/customermain/LoginByToken",JSON.stringify(body), {headers: headers});
  }

  getCustomerInfo() : Observable<any> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/customermain/CustomerInfoSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getCustomerMainInfo() {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/customermain/CustomerMainSearch",JSON.stringify(body), {headers: headers});
  }

  getBrandInfo() {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/common/BrandSearch",JSON.stringify(body), {headers: headers});
  }

  getBarcodeInfo() : Observable<BarcodeInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/customermain/BarcodeSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);    
  }

  getMainShopListInfo(type: string, page: string, row_count: string, brnd_cd: string) {
    let headers = this.makeHeader();
    let body;
    if(brnd_cd != '' && brnd_cd != null){
      body = {'TYPE':type,'CUSTOMER_LOCATION_X':this.customer_location_x,'CUSTOMER_LOCATION_Y':this.customer_location_y,'ROW_COUNT':row_count,'PAGE':page, 'BRND_CD':brnd_cd}
    } else{
      body = {'TYPE':type,'CUSTOMER_LOCATION_X':this.customer_location_x,'CUSTOMER_LOCATION_Y':this.customer_location_y,'ROW_COUNT':row_count,'PAGE':page}
    }
    
    return this.http.post(this.API_URL+"/shop/MainShopListSearch",JSON.stringify(body), {headers: headers});
  }

  deviceAppCheck() {
    let headers = this.makeHeader();
    let body = {'DEVICE_TYPE':'001','DEVICE_ID':'869047034485681','DEVICE_TOKEN':'','APP_VERSION':'1.2.4'}

    return this.http.post(this.API_URL+"/customer/DeviceAppCheck",JSON.stringify(body), {headers: headers});
  }

  getTOSInfo() {
    let headers = this.makeHeader();
    let body = {'ESSENTIAL_YN':'A','AGREE_YN':'A'}

    return this.http.post(this.API_URL+"/customer/TOSSearch",JSON.stringify(body), {headers: headers});
  }

  getPointUseMainSearch() : Observable<PointUseMainInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/pointmng/PointUseMainSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getPointUseListSearch(month: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':month,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(this.API_URL+"/pointmng/PointUseListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getStampUseMainSearch() : Observable<StampUseMainInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/stampmng/StampUseMainSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getStampUseListSearch(month: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':month,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(this.API_URL+"/stampmng/StampUseListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getCashUseMainSearch() : Observable<CashUseMainInfo> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/cashmng/CashUseMainSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getCashUseListSearch(month: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':month,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(this.API_URL+"/cashmng/CashUseListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getShopDetailSearch(store_cd: string) : Observable<ShopDetailInfo> {
    let headers = this.makeHeader();
    let body = {'SHOP_CD':store_cd,'ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(this.API_URL+"/shop/ShopDetailSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getPoolShopDetailSearch(row_count: number, page: number,pool_cd: string, pool_service_type: string, location_x: string, location_y: string) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'POOL_CD':pool_cd,'ROW_COUNT':row_count.toString(),'PAGE':page.toString(), 'POOL_SERVICE_TYPE':pool_service_type,'CUSTOMER_LOCATION_X':location_x,'CUSTOMER_LOCATION_Y':location_y}

    return this.http.post(this.API_URL+"/myo2zone/PoolShopDetailSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getMyO2ZoneMainSearch(row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(this.API_URL+"/myo2zone/MyO2ZoneMain",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getO2CouponListSearch(coupon_type: string, keyword: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'COUPON_TYPE':coupon_type,'ROW_COUNT':row_count.toString(),'PAGE':page.toString(), 'KEYWORD':keyword}

    return this.http.post(this.API_URL+"/couponshop/O2CouponListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getO2MyCouponListSearch(search_type: string, row_count: number, page: number) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_TYPE':search_type,'ROW_COUNT':row_count.toString(),'PAGE':page.toString()}

    return this.http.post(this.API_URL+"/couponshop/O2MyCouponListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getO2CouponDetailSearch(coupon_cd: string) : Observable<O2CouponDetailInfo> {
    let headers = this.makeHeader();
    let body = {'COUPON_CD':coupon_cd}

    return this.http.post(this.API_URL+"/couponshop/O2CouponDetailSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getMyCouponDetailSearch(coupon_seq: string) : Observable<O2MyCouponDetailInfo> {
    let headers = this.makeHeader();
    let body = {'COUPON_SEQ':coupon_seq}

    return this.http.post(this.API_URL+"/couponshop/O2MyCouponDetailSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getThemaZoneListSearch() : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(this.API_URL+"/shop/ThemaZoneListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getThemaZoneDetailSearch(thema_seq: string) : Observable<any> {
    let headers = this.makeHeader();
    let body = {'THEMA_SEQ':thema_seq}

    return this.http.post(this.API_URL+"/shop/ThemaZoneDetailSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  couponCreate(coupon_cd: string) : Observable<any> {
    let headers = this.makeHeader();
    let body = {'COUPON_CD':coupon_cd}

    return this.http.post(this.API_URL+"/coupon/CouponCreate",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  couponUse(coupon_seq: string) : Observable<any> {
    let headers = this.makeHeader();
    let body = {'COUPON_SEQ':coupon_seq}

    return this.http.post(this.API_URL+"/coupon/CouponUse",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getShopListSearch(keyword: string, row_count: number, page: number, type: string, region_cd: string, category_cd: string, location_x: string, location_y: string ) : Observable<string[]> {
    let headers = this.makeHeader();
    let body = {'SEARCH_KEYWORD':keyword,'ROW_COUNT':row_count.toString(),'PAGE':page.toString(), 'TYPE':type,'REGION_CD':region_cd,'CATEGORY_CD':category_cd,'CUSTOMER_LOCATION_X':location_x,'CUSTOMER_LOCATION_Y':location_y}

    console.info("body:" + JSON.stringify(body));;

    return this.http.post(this.API_URL+"/shop/ShopListSearch",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  setPushUse(pushUseYn: string) {
    let headers = this.makeHeader();
    let body = {'PUSH_USE_YN':pushUseYn}

    return this.http.post(this.API_URL+"/setting/PushUse",JSON.stringify(body), {headers: headers});
  }

  setTOSAgreement(tosList: any) {
    let headers = this.makeHeader();
    let body = {'TOS_LIST':JSON.stringify(tosList)}

    return this.http.post(this.API_URL+"/customer/TOSAgreement",JSON.stringify(body), {headers: headers});
  }

  setPayPWChange(checkYn: string, inputVal: string, inputVal2: string){
    let headers = this.makeHeader();
    let body = {'PW_CHECK_TYPE':checkYn,'PAY_PW_NEW':inputVal,'PAY_PW_NEW2':inputVal2}

    return this.http.post(this.API_URL+"/setting/PayPWChange",JSON.stringify(body), {headers: headers});
  }

  ServiceClose(out_pw: string){
    let headers = this.makeHeader();
    let body = {'OUT_PW':out_pw}

    return this.http.post(this.API_URL+"/setting/ServiceClose",JSON.stringify(body), {headers: headers});
  }

  customerInfoChange(mdn: string, customer_nm: string, birthday: string, sex_cd: string, email: string, out_pw: string){
    let headers = this.makeHeader();
    let body = {'MDN':mdn, 'CUSTOMER_NM':customer_nm, 'BIRTHDAY':birthday, 'SEX_CD':sex_cd, 'EMAIL':email, 'OUT_PW':out_pw}

    return this.http.post(this.API_URL+"/customermain/CustomerInfoChange",JSON.stringify(body), {headers: headers});
  }

  idChange(mdn: string, customer_nm: string, auth_num: string){
    let headers = this.makeHeader();
    let body = {'MDN':mdn, 'CUSTOMER_NM':customer_nm, 'AUTH_NUMBER':auth_num}

    return this.http.post(this.API_URL+"/setting/IDChange",JSON.stringify(body), {headers: headers});
  }

  pwChange(out_pw: string, out_pw_new: string, out_pw_new2: string): Observable<any> {
    let headers = this.makeHeader();
    let body = {'OUT_PW':out_pw, 'OUT_PW_NEW':out_pw_new, 'OUT_PW_NEW2':out_pw_new2}

    return this.http.post(this.API_URL+"/setting/PWChange",JSON.stringify(body), {headers: headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  authNumberSend(mdn: string){
    let headers = this.makeHeader();
    let body = {'MDN':mdn}

    return this.http.post(this.API_URL+"/customer/AuthNumberSend",JSON.stringify(body), {headers: headers});
  }

  //회원등록전 휴대폰 인증번호 MDN과 함께 전달
  authNumberConfirm(mdn: string, auth_number: string){
    let headers = this.makeHeader();
    let body = {'MDN': mdn, 'AUTH_NUMBER': auth_number}
     return this.http.post(this.API_URL + "/customer/AuthNumberConfirm",JSON.stringify(body), {headers: headers});
  }

  //아이디 찾기
  iDSearch(customer_nm: string, email: string){
    let headers = this.makeHeader();
    let body = {'CUSTOMER_NM':customer_nm, 'EMAIL':email}

    return this.http.post(this.API_URL + "/setting/IDSearch", JSON.stringify(body), {headers: headers});
  }

  //패스워드 찾기
  pWSearch(pw_search_type: string, mdn: string, customer_nm: string, auth_number: string){
    let headers = this.makeHeader();
    let body = {'PW_SEARCH_TYPE':pw_search_type, 'MDN':mdn, CUSTOMER_NM: customer_nm, AUTH_NUMBER: auth_number}

    return this.http.post(this.API_URL + "/setting/PWSearch", JSON.stringify(body), {headers: headers});
  }

  //회원 존재여부 확인
  customerExist(mdn: string){
    let headers = this.makeHeader();
    let body = {'MDN':mdn};

    return this.http.post(this.API_URL + "/customer/CustomerExist",JSON.stringify(body), {headers: headers});
  }

  //Tos 정보를 조회
  tosSearch(essential_yn: string, agree_yn: string){
    let headers = this.makeHeader();
    let body = {'ESSENTIAL_YN': essential_yn, 'AGREE_YN': agree_yn};

    return this.http.post(this.API_URL + "/customer/TOSSearch",JSON.stringify(body), {headers: headers});
  }

  //회원가입
  association(jsonRegData: Object){
    let headers = this.makeHeader();
    return this.http.post(this.API_URL + "/customer/Association",JSON.stringify(jsonRegData), {headers: headers});
  }

  //로그아웃
  logout(){
    let headers = this.makeHeader();
    let body = {}
    return this.http.post(this.API_URL + "/setting/Logout",JSON.stringify(body), {headers: headers});
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

export class O2CouponDetailInfo {
  COUPON_NM: string; 
  RESULT_CODE: string; 
  PURCHASE_POINT: string; 
  CONSTRAINT_NOTICE4: string; 
  CONSTRAINT_NOTICE3: string; 
  CONSTRAINT_NOTICE2: string; 
  CONSTRAINT_NOTICE1: string; 
  USE_NOTICE1: string; 
  USE_NOTICE3: string; 
  COUPON_CD: string; 
  USE_NOTICE2: string; 
  SHOP_NM: string; 
  DISCOUNT_RATE: string; 
  DOWNLOAD_CNT: string; 
  SHOP_CD: string; 
  VALID_DATE: string; 
  COUPON_KIND: string; 
  COUPON_TYPE: string; 
  COUPON_PRICE: string; 
  AVAIL_POINT: string; 
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}

export class O2MyCouponDetailInfo {
  COUPON_NM: string; 
  RESULT_CODE: string; 
  CONSTRAINT_NOTICE4: string; 
  CONSTRAINT_NOTICE3: string; 
  CONSTRAINT_NOTICE2: string; 
  CONSTRAINT_NOTICE1: string; 
  USE_NOTICE1: string; 
  USE_NOTICE3: string; 
  COUPON_CD: string; 
  COUPON_SEQ: string;
  USE_NOTICE2: string; 
  SHOP_NM: string; 
  SHOP_CD: string; 
  VALID_START_DATE: string; 
  VALID_END_DATE: string; 
  COUPON_KIND: string; 
  COUPON_TYPE: string;
  POS_AGENT_USE_YN: string; 
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }  
}

export class BarcodeInfo{
  BARCODE: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

