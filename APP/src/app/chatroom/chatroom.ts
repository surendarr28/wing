declare var require: any
const io = require('socket.io-client');

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Config } from '../config/config';
import { Router } from '@angular/router';


@Component({
    selector: 'chatroom',
    styleUrls: ['./chatroom.css'],
    templateUrl: './chatroom.html'
})
export class ChatRoom implements OnInit, OnDestroy {
    private gameCards: any;
    private gameQuickCards: any;
    private gameBetCards: any;
    private socket: any;
    private message: any;
    private contactList: any[];
    private messageList: any[];

    constructor(public toastr: ToastsManager, private _config: Config, private router: Router) {
        let self = this;
        self.socket = io(self._config.SocketBaseUrl() + 'home');
        self.contactList = [
            {
                name: "Surendar",
                slogn: "Welcome to chat",
                status: "ONLINE",
                chatno: 2,
                image: ""
            },
            {
                name: "Prakash",
                slogn: "Welcome to chat",
                status: "OFFLINE",
                chatno: 5,
                image: ""
            },
            {
                name: "Sravan",
                slogn: "Welcome to chat",
                status: "ONLINE",
                chatno: 20,
                image: ""
            },
            {
                name: "Siva",
                slogn: "Welcome to chat",
                status: "ONLINE",
                chatno: 0,
                image: ""
            },
            {
                name: "Ranjith Kumar",
                slogn: "Welcome to chat",
                status: "OFFLINE",
                chatno: 102,
                image: ""
            },
            {
                name: "Arun Kumar",
                slogn: "Welcome to chat",
                status: "OFFLINE",
                chatno: 40,
                image: ""
            },
            {
                name: "Bala",
                slogn: "Welcome to chat",
                status: "ONLINE",
                chatno: 0,
                image: ""
            },
            {
                name: "Santhosh",
                slogn: "Welcome to chat",
                status: "OFFLINE",
                chatno: 69,
                image: ""
            },
            {
                name: "Nandi",
                slogn: "Welcome to chat",
                status: "ONLINE",
                chatno: 2,
                image: ""
            },
            {
                name: "Prabu",
                slogn: "Welcome to chat",
                status: "ONLINE",
                chatno: 2,
                image: ""
            }
        ]

        self.messageList = [
            {
                message: "All the design inspiration you need. It’s like crack for designers. And good for you too!",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 1,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 1,
            },
            {
                message: "Hi",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 1,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 1
            },
            {
                message: "Welcome",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 1,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 2
            },
            {
                message: "Thanks, for replay",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 1,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 2
            },
            {
                message: "Bye",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 1,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 1
            },
            {
                message: "Good Bye",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 1,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 2
            },

            {
                message: "see y sone!!!",
                from: {
                    id: 1,
                    display_name: "prabu"
                },
                on: "02:20 PM",
                status: 2,
                to: {
                    id: 2,
                    display_name: "siva"
                },
                type: 2
            },
        ]
    }

    ngOnInit() {
        let self = this;
        setTimeout(function () {
            var objDiv = document.getElementById("messageContiner");
            console.log(objDiv);
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 200);
        self.messageList.push({
            message: "...",
            from: {
                id: 1,
                display_name: "prabu"
            },
            on: "02:20 PM",
            status: 0,
            to: {
                id: 2,
                display_name: "siva"
            },
            type: 2
        })
    }

    ngOnDestroy() {
        console.log("disconn");
        this.socket.disconnect();
    }

    sendMessage(_message: string) {
        let self = this;

        self.messageList[self.messageList.length - 1] = {
            message: _message,
            from: {
                id: 1,
                display_name: "prabu"
            },
            on: "02:20 PM",
            status: 1,
            to: {
                id: 2,
                display_name: "siva"
            },
            type: 2
        };
        self.messageList.push({
            message: "...",
            from: {
                id: 1,
                display_name: "prabu"
            },
            on: "02:20 PM",
            status: 0,
            to: {
                id: 2,
                display_name: "siva"
            },
            type: 2
        });

        self.message = "";

        setTimeout(function () {
            var objDiv = document.getElementById("messageContiner");
            console.log(objDiv);
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 50);
    }
}


