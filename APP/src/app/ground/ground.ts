declare var require: any
const io = require('socket.io-client');


import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ground',
  styleUrls: ['./ground.css'],
  templateUrl: './ground.html'
})

export class Ground implements OnInit {
  private socket: any;
  private message: string;
  private room: string = '222';
  private score: number = 0;
  private left: number = 0;
  private right: number = 0;
  private timer: any = "20:00";

  constructor() {
    this.socket = io('http://localhost:8085/score');
    this.socket.on('message', function (data) {
      console.log(data);
    });
    this.socket.on('news', function (data) {
      console.log(data);
    });
  }

  ngOnInit() {
    var self = this;
    function countdown(minutes) {
      var seconds = 60;
      var mins = minutes
      function tick() {
        var current_minutes = mins - 1
        seconds--;
        self.timer =
          current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
          setTimeout(tick, 1000);
        } else {
          if (mins > 1) {
            setTimeout(function () { countdown(mins - 1); }, 1000);
          } else {
            self.timer = "completed";
          }
        }
      }
      tick();
    }
    countdown(1);
  }

  clicked() {
    this.socket.emit('chat', { room: this.room, my: this.message });
  }

  scoreUpdate(scoreData) {
    this.score = scoreData.score;
    this.left = scoreData.left;
    this.right = scoreData.right;
  }
}
