import { Injectable } from '@angular/core';
import{ Brightness } from '@ionic-native/brightness';

//Device Handler Class
@Injectable()
export class DeviceManagerProvider {
    constructor(public brightness: Brightness) {
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
}