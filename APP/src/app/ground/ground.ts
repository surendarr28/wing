declare var require: any
const io = require('socket.io-client');


import {Component, OnInit, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Config} from '../config/config';

@Component({
  selector: 'ground',
  styleUrls: ['./ground.css'],
  templateUrl: './ground.html'
})

export class Ground implements OnInit, OnDestroy {
  private socket: any;
  private message: string;
  private room: string = '222';
  private score: number = 0;
  private left: number = 0;
  private right: number = 0;
  private timer: any = "20:00";
  private jwtHelper: JwtHelper = new JwtHelper();
  private userData: any;
  private gameCare: any;
  private grounId: any;

  constructor(private route: ActivatedRoute, private _config: Config, private router: Router) {
    let self = this;
    self.socket = io(self._config.SocketBaseUrl() + 'join');
    self.userData = self.jwtHelper.decodeToken(localStorage.getItem('currentUser'));
    self.gameCare = {
      gamedetail: {
        team: "",
        members: "",
        gameName: "",
        gameCategory: ""
      },
      members: []
    }
  }

  ngOnInit() {
    let self = this;
    this.route.params.forEach((params: Params) => {
      self.grounId = +params['gameid'];
    });

    self.socket.emit('getground', {
      id: self.grounId,
      userId: self.userData.iUserId
    });

    self.socket.on('sendgamecard', function (data) {
      self.gameCare = data;
    })


    self.countdown(1);

  }

  countdown(minutes) {
    let self = this;
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
          setTimeout(function () { self.countdown(mins - 1); }, 1000);
        } else {
          self.timer = "completed";
        }
      }
    }
    tick();
  }


  scoreUpdate(scoreData) {
    let self = this;
    self.score = scoreData.score;
    self.left = scoreData.left;
    self.right = scoreData.right;
    self.socket.emit('updateScore', {
      id: self.grounId,
      userId: self.userData.iUserId,
      score: self.score
    });
  }

  ngOnDestroy() {
    console.log("disconn");
    this.socket.disconnect();
  }

  refreshGame() {
    this.timer = "";
    this.countdown(1);
  }
}
