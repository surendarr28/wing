declare var require: any
const io = require('socket.io-client');

import {Component} from '@angular/core';

@Component({
  selector: 'joinroom',
  styleUrls: ['./joinroom.css'],
  templateUrl: './joinroom.html'
})
export class JoinRoom {
  private socket: any;
  private message: string;
  private room: string = '222';
  constructor() {
    this.socket = io('http://localhost:8085/score');
    this.socket.on('message', function (data) {
      console.log(data);
    });
    this.socket.on('news', function (data) {
      console.log(data);
    });
  }

  clicked() {
    this.socket.emit('chat', { room: this.room, my: this.message });
  }

  join() {
    this.socket.emit('join', { room: this.room });
  }
}
