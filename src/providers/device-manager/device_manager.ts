import { Injectable } from '@angular/core';
import{ Brightness } from '@ionic-native/brightness';
import { Device } from '@ionic-native/device';
import { Platform } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AppVersion } from '@ionic-native/app-version';

//Device Handler Class
@Injectable()
export class DeviceManagerProvider {

    constructor(public brightness: Brightness, public device: Device, public appVersion: AppVersion, public plt: Platform) {
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

    //iOS, Android, Window 구분
    getDeviceType(){
        if (this.device.platform == 'iOS') { return '001'; }
        else if (this.device.platform == 'Android') { return '002'; }
        else if (this.device.platform == 'WinCE') { return '003'; }
        else return '000';
    }

    //디바이스 아이디 Android: 디바이스 아이디, iOS:UUID
    getDeviceId(){
        return this.device.uuid;
    }

    //디바이스 토큰 Android: 등록키, iOS:디바이스 토큰
    getDeviceToken(){
        return this.device.serial;
    }

    //단말기 모델 코드 Android 필수
    getEqpMdlCd(){
        return this.device.model;
    }

    //단말기일련번호 Android 필수
    getEqpSerNum(){
        return this.device.serial;
    }

    //OS 버전
    getOsVersion(){
        return this.device.version;
    }

    //APP 버전
    getAppVersion(){
        return this.appVersion.getVersionNumber();
    }
}