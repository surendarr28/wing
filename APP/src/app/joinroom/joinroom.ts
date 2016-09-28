declare var require: any
const io = require('socket.io-client');


import {Component, OnInit, OnDestroy} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Config} from '../config/config';

@Component({
  selector: 'joinroom',
  styleUrls: ['./joinroom.css'],
  templateUrl: './joinroom.html'
})
export class JoinRoom implements OnInit, OnDestroy {
  private socket: any;
  private message: string;
  private jwtHelper: JwtHelper = new JwtHelper();
  private userData: any;
  private gameCare: any;

  constructor(private route: ActivatedRoute, private _config: Config, private router: Router) {
    let self = this;
    self.socket = io(self._config.SocketBaseUrl() + 'join');
    self.userData = self.jwtHelper.decodeToken(localStorage.getItem('currentUser'));
    self.gameCare = {
      gamedetail: {
        team: "",
        gameid: "",
        members: "",
        gameName: "",
        gameCategory: ""
      },
      members: []
    }
  }

  ngOnInit() {
    let self = this;
    let id;
    this.route.params.forEach((params: Params) => {
      id = +params['cardid'];
    });
    self.socket.emit('getgamecard', {
      id: id,
      member: {
        userId: self.userData.iUserId,
        username: self.userData.vcUsername,
        score: 0
      }
    });

    self.socket.on('sendgamecard', function (data) {
      console.log(data);
      self.gameCare = data;
    })
  }

  ngOnDestroy() {
    console.log("disconn");
    this.socket.disconnect();
  }

  goToGround() {
    this.router.navigate(['/gameground', this.gameCare.id, this.gameCare.gamedetail.gameid]);
  }
}
