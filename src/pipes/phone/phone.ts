import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PhonePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(phone, args) {
    let ret = "";
    let regexp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
    
    if(regexp.test(phone)){
      ret = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    }else{
      ret = phone;
    }
    
    return ret;
  }
}



