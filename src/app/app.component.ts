import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {WordPage} from '../pages/word/word';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = WordPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
   //   ScreenOrientation.lockOrientation('landscape');
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
