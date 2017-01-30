import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, Platform} from 'ionic-angular';
import {SpeechRecognition} from "ionic-native";

/*
  Generated class for the Word page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage {
  @ViewChild(Slides) slides: Slides;
  words = [];

  listeningOptions = {
    language: "en-US",
    showPartial: true
  };

  dictionary = ['a',
    'about',
    'after',
    'again',
    'all',
    'always',
    'am',
    'an',
    'and',
    'any',
    'apple',
    'are',
    'around',
    'as',
    'ask',
    'at',
    'ate',
    'away',
    'baby',
    'back',
    'ball',
    'be',
    'bear',
    'because',
    'bed',
    'been',
    'before',
    'bell',
    'best',
    'better',
    'big',
    'bird',
    'birthday',
    'black',
    'blue',
    'boat',
    'both',
    'box',
    'boy',
    'bread',
    'bring',
    'brother',
    'brown',
    'but',
    'buy',
    'by',
    'cake',
    'call',
    'came',
    'can',
    'car',
    'carry',
    'cat',
    'chair',
    'chicken',
    'children',
    'clean',
    'coat',
    'cold',
    'come',
    'corn',
    'could',
    'cow',
    'cut',
    'day',
    'did',
    'do',
    'does',
    'dog',
    'doll',
    'done',
    'don\'t',
    'door',
    'down',
    'draw',
    'drink',
    'duck',
    'eat',
    'egg',
    'eight',
    'every',
    'eye',
    'fall',
    'far',
    'farm',
    'farmer',
    'fast',
    'father',
    'feet',
    'find',
    'fire',
    'first',
    'fish',
    'five',
    'floor',
    'flower',
    'fly',
    'for',
    'found',
    'four',
    'from',
    'full',
    'funny',
    'game',
    'garden',
    'gave',
    'get',
    'girl',
    'give',
    'go',
    'goes',
    'going',
    'good',
    'goodbye',
    'got',
    'grass',
    'green',
    'ground',
    'grow',
    'had',
    'hand',
    'has',
    'have',
    'he',
    'head',
    'help',
    'her',
    'here',
    'hill',
    'him',
    'his',
    'hold',
    'home',
    'horse',
    'hot',
    'house',
    'how',
    'hurt',
    'I',
    'if',
    'in',
    'into',
    'is',
    'it',
    'its',
    'jump',
    'just',
    'keep',
    'kind',
    'kitty',
    'know',
    'laugh',
    'leg',
    'let',
    'letter',
    'light',
    'like',
    'little',
    'live',
    'long',
    'look',
    'made',
    'make',
    'man',
    'many',
    'may',
    'me',
    'men',
    'milk',
    'money',
    'morning',
    'mother',
    'much',
    'must',
    'my',
    'myself',
    'name',
    'nest',
    'never',
    'new',
    'night',
    'no',
    'not',
    'now',
    'of',
    'off',
    'old',
    'on',
    'once',
    'one',
    'only',
    'open',
    'or',
    'our',
    'out',
    'over',
    'own',
    'paper',
    'party',
    'pick',
    'picture',
    'pig',
    'play',
    'please',
    'pretty',
    'pull',
    'put',
    'rabbit',
    'rain',
    'ran',
    'read',
    'red',
    'ride',
    'right',
    'ring',
    'robin',
    'round',
    'run',
    'said',
    'saw',
    'say',
    'school',
    'see',
    'seed',
    'seven',
    'shall',
    'she',
    'sheep',
    'shoe',
    'show',
    'sing',
    'sister',
    'sit',
    'six',
    'sleep',
    'small',
    'snow',
    'so',
    'some',
    'song',
    'soon',
    'squirrel',
    'start',
    'stick',
    'stop',
    'street',
    'sun',
    'table',
    'take',
    'tell',
    'ten',
    'thank',
    'that',
    'the',
    'their',
    'them',
    'then',
    'there',
    'these',
    'they',
    'thing',
    'think',
    'this',
    'those',
    'three',
    'time',
    'to',
    'today',
    'together',
    'too',
    'top',
    'toy',
    'tree',
    'try',
    'two',
    'under',
    'up',
    'upon',
    'us',
    'use',
    'very',
    'walk',
    'want',
    'warm',
    'was',
    'wash',
    'watch',
    'water',
    'way',
    'we',
    'well',
    'went',
    'were',
    'what',
    'when',
    'where',
    'which',
    'white',
    'who',
    'why',
    'will',
    'wind',
    'window',
    'wish',
    'with',
    'wood',
    'work',
    'would',
    'write',
    'yellow',
    'yes',
    'you',
    'your'];


  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordPage');
    this.shuffle();
    this.words = this.dictionary;

    this.platform.ready().then(() => {
      SpeechRecognition.requestPermission()
        .then(
          () => this.startListening(),
          () => console.log('Denied')
        ).catch((err) => {
        console.log("error: "+err)
      })
    }).catch((err) => {
      console.log("error at platform then")
    });

  }

  startListening(){
    SpeechRecognition.hasPermission().then((hasPermission: boolean) => {
      if(hasPermission) {
        console.log("has permission = "+hasPermission);
        SpeechRecognition.startListening(this.listeningOptions).subscribe(
            (matches: Array<string>) => {
                for(let match of matches){
                  console.log("match="+match);
                  if(match.toUpperCase().indexOf(this.getCurrentWord().toUpperCase()) > -1){
                    SpeechRecognition.stopListening().then(()=>{
                      console.log("stopped listening...");
                      this.nextPage();
                    });
                    break;
                  }
                }
            },
            (onerror) => {
              console.log('error:', onerror)
              SpeechRecognition.stopListening().then(()=> {
                console.log("stopped - restarting");
                this.startListening();
              });
            }
          );
      }else{
        console.log("no permission to listen")
      }
    }).catch((err) => {
      console.log("error while checking hasPermission: "+err)
    })
  }

  nextPage(){
    this.slides.slideNext();
    setTimeout(() => { // <===
      this.startListening();
    }, 900);
  }

  private getCurrentWord(){
    return this.dictionary[this.slides.getActiveIndex()-1]
  }

  shuffle() {
    let i = 0
      , j = 0
      , temp = null

    for (i = this.dictionary.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.dictionary[i];
      this.dictionary[i] = this.dictionary[j];
      this.dictionary[j] = temp
    }
}

}
