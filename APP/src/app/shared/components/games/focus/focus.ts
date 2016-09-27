declare var require: any;
declare var $: any;
const io = require('socket.io-client');

import {Component, OnInit, OnDestroy, Pipe, PipeTransform, Output, Input, EventEmitter} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Config} from '../../../../config/config';

@Component({
  selector: 'FocusGame',
  styleUrls: ['./focus.css', './focus.animation.css'],
  templateUrl: './focus.html'
})
export class FocusGame implements OnInit, OnDestroy {
  @Output() scoreUpdate = new EventEmitter();
  @Output() timeUpdate = new EventEmitter();
  private socket: any;
  @Input() grounId: any;
  private message: string;
  private room: string = '222';
  private pipeArray: any = [];
  private jwtHelper: JwtHelper = new JwtHelper();
  private userData: any;
  private leftChange: boolean = false;
  private rightChange: boolean = false;
  private errorChange: boolean = false;
  private score: number = 0;
  private left: number = 0;
  private right: number = 0;
  private timer: any = "";
  private start: boolean = false;
  private intervelTimer: any = 0;


  constructor(private route: ActivatedRoute, private _config: Config, private router: Router) {
    let self = this;
    self.socket = io(self._config.SocketBaseUrl() + 'focus');
    self.userData = self.jwtHelper.decodeToken(localStorage.getItem('currentUser'));
    console.log(self);
  }
  refreshGame() {
    let self = this;
    var seconds = 3;
    var id = setInterval(timertick, 1000);
    function timertick() {
      var t = seconds--;
      self.intervelTimer = t;
    }
    setTimeout(function () {
      clearInterval(id);
      self.intervelTimer = 0;
      self.timer = "";
      self.socket.emit('getstack', { userId: self.userData.iUserId });
      self.socket.emit('generatetime', { minute: 1 });
    }, 4000);

  }

  countdown(minutes) {
    let self = this;
    var seconds = 60;
    var mins = minutes
    function tick() {
      var current_minutes = mins - 1
      seconds--;
      self.timer = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
      self.timeUpdate.emit(self.timer);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        if (mins > 1) {
          setTimeout(function () { self.countdown(mins - 1); }, 1000);
        } else {
          self.timer = "completed";
          self.timeUpdate.emit(self.timer);
        }
      }
    }
    tick();
  }

  clicked(e) {
    console.log(e);
  }

  ngOnInit() {
    let self = this;
    self.socket.emit('updateScore', {
      id: self.grounId,
      userId: self.userData.iUserId,
      action: 'reset'
    });
    var seconds = 3;
    var id = setInterval(timertick, 1000);
    function timertick() {
      var t = seconds--;
      self.intervelTimer = t;
    }
    setTimeout(function () {
      clearInterval(id);
      self.intervelTimer = 0;
      self.socket.emit('getstack', { userId: self.userData.iUserId });

      self.socket.on('sendstack', function (data) {
        console.log(data);
        self.pipeArray = data;
      })

      self.socket.on('ticktick', function (data) {
        console.log(data);
        self.timer = data;
        self.timeUpdate.emit(data);
      });

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
            self.scoreUpdate.emit({ score: self.score, left: self.left, right: self.right, action: 'left', answare: rmData[0].value });
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
            self.scoreUpdate.emit({ score: self.score, left: self.left, right: self.right, action: 'right', answare: rmData[0].value });
            break;
        }
      });
      self.socket.emit('generatetime', { minute: 1 });
      console.log(this.pipeArray);
    }, 4000);
  }

  ngOnDestroy() {
    console.log("disconn");
    this.socket.disconnect();
  }
}
