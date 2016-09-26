declare var require: any
const io = require('socket.io-client');

import {Component, OnInit, OnDestroy} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Config} from '../config/config';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.css'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit, OnDestroy {
  private gameCards: any;
  private gameQuickCards: any;
  private gameBetCards: any;
  private socket: any;

  constructor(public toastr: ToastsManager, private _config: Config, private router: Router) {
    let self = this;
    self.socket = io(self._config.SocketBaseUrl() + 'home');
    self.socket.on('dashboardlist', function (data) {
      console.log(data);
      self.gameCards = data;
      self.gameQuickCards = data.filter((element) => {
        return element.category == 1;
      })
      self.gameBetCards = data.filter((element) => {
        return element.category == 2;
      })
    })
  }

  ngOnInit() {
  }

  goToJoinRoom(item) {
    item.status = 2;
    this.socket.emit('updatelist', item);
    this.router.navigate(['/join', item.id]);
  }

  ngOnDestroy() {
    console.log("disconn");
    this.socket.disconnect();
  }
}


