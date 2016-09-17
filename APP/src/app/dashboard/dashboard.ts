declare var require: any
const io = require('socket.io-client');

import {Component} from '@angular/core';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.css'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor() {
    var socket = io('http://localhost:8085/home');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'dashboard' });
    })
  }
}


