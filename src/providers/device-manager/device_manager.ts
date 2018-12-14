import { Injectable } from '@angular/core';
import{ Brightness } from '@ionic-native/brightness';
import { Device } from '@ionic-native/device';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AppVersion } from '@ionic-native/app-version';
import { Uid } from '@ionic-native/uid';

//Device Handler Class
@Injectable()
export class DeviceManagerProvider {

    constructor(public brightness: Brightness, public device: Device, public appVersion: AppVersion, public uid: Uid) {
    }

    //화면 밝기 값 조절 (0 ~ 1)
    setBrightness(val){
        try {      
            this.brightness.setBrightness(val);
        }catch (err) {
            console.info('Error:' + err);      
        }   
    }

    //현재 화면 밝기 값 가져오기 (0 ~ 1)
    getBrightness(){
        return this.brightness.getBrightness().then( value => {             
            return value; 
        }).catch(error => {console.info("err:" + error)});
    }

    
    //IMEI 단말기 식별번호
    getImei(){
        var imei = this.uid.IMEI;
        if(imei == null)    imei = "-";
        return imei;
    }

    //iOS, Android, Window 구분
    getDeviceType(){
        if (this.device.platform == 'iOS') { return '001'; }
        else if (this.device.platform == 'Android') { return '002'; }
        else if (this.device.platform == 'WinCE') { return '003'; }
        else return '000';
    }

    //디바이스 아이디 Android: 디바이스 아이디, iOS:UUID
    getDeviceId(){
        var uuid = this.device.uuid;
        if(uuid == null)    uuid = "-";
        return uuid;
    }

    //디바이스 토큰 Android: 등록키, iOS:디바이스 토큰
    getDeviceToken(){
        var serial = this.device.serial;
        if(serial == null)  serial = "-";
        return serial;
    }

    //단말기 모델 코드 Android 필수
    getEqpMdlCd(){
        var model = this.device.model;
        if(model == null)   model = "-";
        return model;
    }

    //단말기일련번호 Android 필수
    getEqpSerNum(){
        var serial = this.device.serial;
        if(serial == null)  serial = "-";
        return serial;
    }

    //OS 버전
    getOsVersion(){
        var version = this.device.version;
        if(version == null) version = "-";
        return version;
    }

    //APP 버전
    getAppVersion(){
        var versionNumber
        //this.appVersion.getVersionNumber().then((s) => {
        //    versionNumber = s;
        //});
        return versionNumber = "-";
    }
}