import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the DbManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbManagerProvider {

  constructor(public storage: Storage) { }
 
  isExist(key, val) {
    return this.getAllData(key).then(result => {
      return result && result.indexOf(val) !== -1;
    });
  }
 
  setData(key, val) {
    return this.getAllData(key).then(result => {
      // if (result) {
      //   result.push(val);
      //   return this.storage.set(key, result);
      // } else {
        console.log("데이터 저장 - key: " + key + " / val: " + val);
        return this.storage.set(key, val);
      // }
    });
  }
 
  removeData(key) {
    return this.getAllData(key).then(result => {
      if (result) {
        var index = result.indexOf(key);
        result.splice(index, 1);
        return this.storage.set(key, result);
      }
    });
  }

  getData(key) {
    return this.storage.get(key);
  }
 
  getAllData(key) {
    console.log(this.storage.get(key));
    return this.storage.get(key);
  }
 

}
