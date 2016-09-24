declare var require: any;
declare var $: any;
const io = require('socket.io-client');


import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'FocusGame',
  styleUrls: ['./focus.css', './focus.animation.css'],
  templateUrl: './focus.html'
})
export class FocusGame {
  @Output() scoreUpdate = new EventEmitter();
  private socket: any;
  private message: string;
  private room: string = '222';
  private pipeArray: any = [];
  private leftChange: boolean = false;
  private rightChange: boolean = false;
  private errorChange: boolean = false;
  private score: number = 0;
  private left: number = 0;
  private right: number = 0;
  

  constructor() {
    this.socket = io('http://localhost:8085/score');
    this.socket.on('message', function (data) {
      console.log(data);
    });
    this.socket.on('news', function (data) {
      console.log(data);
    });
    let self = this;
    var left = 0;
    var top = 0
   
    $(document).keyup(function (e) {
      var keyCode = e.keyCode || e.which;
      var arrow = { left: 37, up: 38, right: 39, down: 40 };
      switch (keyCode) {
        case arrow.left:
          var vvValue = ['A', 'B'][Math.floor(Math.random() * 2)];
          var data = {
            value: vvValue,
            styles: {
              top: top,
              left: left,
            },
            index: 9,
            eClass: vvValue == "A" ? "cell-two" : "cell-one"
          }
          self.pipeArray.push(data);
          var rmData = self.pipeArray.splice(0, 1);
          left = 0;
          top = 0;
          self.pipeArray.forEach((element) => {
            top += 10;
            left += 10;
            element.styles.top = top;
            element.styles.left = left;
          })
          if (rmData[0].value == "A") {
            self.rightChange = false;
            self.errorChange = false;
            self.leftChange = true;
            self.score += 10;
          } else {
            self.rightChange = false;
            self.errorChange = true;
            self.leftChange = false;
            self.score -= 5;
          }
          self.left++;
          self.scoreUpdate.emit({ score: self.score, left: self.left, right: self.right });
          break;
        case arrow.right:
          self.leftChange = false;
          self.errorChange = true;
          var vvValue = ['A', 'B'][Math.floor(Math.random() * 2)];
          var data = {
            value: vvValue,
            styles: {
              top: top,
              left: left,
            },
            index: 9,
            eClass: vvValue == "A" ? "cell-two" : "cell-one"
          }
          self.pipeArray.push(data);
          var rmData = self.pipeArray.splice(0, 1);
          left = 0;
          top = 0;
          self.pipeArray.forEach((element) => {
            top += 10;
            left += 10;
            element.styles.top = top;
            element.styles.left = left;
          })
          if (rmData[0].value == "B") {
            self.rightChange = true;
            self.errorChange = false;
            self.leftChange = false;
            self.score += 10;
          } else {
            self.rightChange = false;
            self.errorChange = true;
            self.leftChange = false;
            self.score -= 5;
          }
          self.right++;
          self.scoreUpdate.emit({ score: self.score, left: self.left, right: self.right });
          break;
      }
    });
    var array = [];

    for (var i = 0; i < 10; i++) {
      top += 10;
      left += 10;
      var vvValue = ['A', 'B'][Math.floor(Math.random() * 2)];
      var data = {
        value: vvValue,
        styles: {
          top: top,
          left: left,
        },
        index: i,
        eClass: vvValue == "A" ? "cell-two" : "cell-one"
      }
      this.pipeArray.push(data);
    }

    console.log(this.pipeArray);
  }

  clicked(e) {
    console.log(e);
  }
}
