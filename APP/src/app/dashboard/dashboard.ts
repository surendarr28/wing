declare var require: any
const io = require('socket.io-client');

import {Component} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.css'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(public toastr: ToastsManager) {

    var socket = io('http://localhost:8085/home');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'dashboard' });
    })
  }
}


