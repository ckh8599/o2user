import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the FindPwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-pw',
  templateUrl: 'find-pw.html',
})
export class FindPwPage {

  checkEmail:boolean;
  checkCell:boolean;

  emailExceptionAlert: string;
  emailFormGroup: FormGroup;

  cellExceptionAlert: string;
  cellFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.emailFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      cell: new FormControl('',Validators.required)
    });

    this.cellFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      cell: new FormControl('',Validators.required),
      auth: new FormControl('',Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPwPage');

    this.emailExceptionAlert = '';
    this.cellExceptionAlert = '';
    this.checkEmail = false;
    this.checkCell = true;
  }

  changeEmail(){
    if(this.checkEmail == true) this.checkCell = false;
    if(this.checkEmail == false) this.checkCell = true;
  }

  changeCell(){
    if(this.checkCell == true) this.checkEmail = false;
    if(this.checkCell == false) this.checkEmail = true;
  }
}
