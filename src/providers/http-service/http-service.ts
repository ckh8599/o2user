import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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

  constructor(public http: HttpClient) {
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

  getPointUseMainSearch(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getPointUseListSearch(url : string) {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':'1','ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getStampUseMainSearch(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getStampUseListSearch(url : string) {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':'1','ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getCashUseMainSearch(url : string) {
    let headers = this.makeHeader();
    let body = {}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getCashUseListSearch(url : string) {
    let headers = this.makeHeader();
    let body = {'SEARCH_MONTH':'1','ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getShopDetailSearch(url : string, pool_cd: string, pool_service_type: string) {
    let headers = this.makeHeader();
    let body = {'POOL_CD':pool_cd,'ROW_COUNT':'10','PAGE':'1', 'POOL_SERVICE_TYPE':pool_service_type}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getPoolShopDetailSearch(url : string, pool_cd: string, pool_service_type: string) {
    let headers = this.makeHeader();
    let body = {'POOL_CD':pool_cd,'ROW_COUNT':'10','PAGE':'1', 'POOL_SERVICE_TYPE':pool_service_type}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
  }

  getMyO2ZoneMainSearch(url : string) {
    let headers = this.makeHeader();
    let body = {'ROW_COUNT':'10','PAGE':'1'}

    return this.http.post(url,JSON.stringify(body), {headers: headers});
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
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); // create header object
        headers = headers.append("Accept", 'application/json');
        headers = headers.append('TRANSACTION_ID', '2018111509170000'); // add a new header, creating a new object
        headers = headers.append('APP_TEST', 'Y'); // add another header
        headers = headers.append('SESSION_ID', this.session_id); // add another header
        return headers;
  }

}