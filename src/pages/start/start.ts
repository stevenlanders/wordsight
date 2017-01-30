import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WordPage} from "../word/word";

/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  start(){
    this.navCtrl.setRoot(WordPage)
  }

}
