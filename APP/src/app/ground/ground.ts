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
  private timer: any = "";
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
  }

  scoreUpdate(scoreData) {
    let self = this;
    self.score = scoreData.score;
    self.left = scoreData.left;
    self.right = scoreData.right;
    self.socket.emit('updateScore', {
      id: self.grounId,
      userId: self.userData.iUserId,
      action: scoreData.action,
      answare: scoreData.answare
    });
  }

  timeUpdate(timeData) {
    let self = this;
    self.timer = timeData;
  }

  ngOnDestroy() {
    console.log("disconn");
    this.socket.disconnect();
  }

  refreshGame() {
    let self = this;
    self.socket.emit('updateScore', {
      id: self.grounId,
      userId: self.userData.iUserId,
      action: 'reset'
    });
    self.timer = "";
  }
}
