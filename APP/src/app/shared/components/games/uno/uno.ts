declare var require: any;
declare var $: any;
const io = require('socket.io-client');

import {Component, OnInit, OnDestroy, Pipe, PipeTransform, Output, Input, EventEmitter} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Config} from '../../../../config/config';

@Component({
    selector: 'UnoGame',
    styleUrls: ['./uno.css'],
    templateUrl: './uno.html'
})
export class UnoGame implements OnInit, OnDestroy {
    private canvas: any;
    private context: any;
    private frameNo: number = 0;
    private interval: any;
    private keys: any = [];

    private type: any;
    private width: any;
    private height: any;
    private speed: any;
    private angle: any;
    private moveAngle: any;
    private color: any;

    private x: any;
    private y: any;

    private car: any;
    private fLeftWheel: any;
    private fRightWheel: any;

    constructor(private route: ActivatedRoute, private _config: Config, private router: Router) {
    }

    ngOnInit() {
        let self = this;
        self.canvas = document.getElementById("gameBoard");

       // self.car = new self.components(50, 60, "red", 225, 225, "");
        self.fLeftWheel = new self.components(10, 20, "green", 200, 210, "");
        self.fRightWheel = new self.components(10, 20, "green", 200, 210, "");
        console.log(self.car);
        self.startGame();
    }

    startGame() {
        let self = this;
        self.canvas.width = 700;
        self.canvas.height = 500;
        self.context = self.canvas.getContext("2d");
        self.frameNo = 0;
        self.interval = setInterval(() => {
            self.updateGameArea(self);
        }, 20);
        this.createKeyboardEvent();
        this.updateGameArea(self);
    }

    createKeyboardEvent() {
        let self = this;
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            self.keys = (self.keys || []);
            self.keys[e.keyCode] = {
                status: (e.type == "keydown"),
                event: "keydown"
            };
            //self.updateGameArea(self);
        })

        window.addEventListener('keyup', function (e) {
            self.keys[e.keyCode]  = {
                status: (e.type == "keydown"),
                event: "keyup"
            };
            //self.updateGameArea(self);
        })
    }

    stopGame() {
        let self = this;
        clearInterval(self.interval);
    }

    clearBoard() {
        let self = this;
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
    }

    components(width, height, color, x, y, type) {
        let self = this;
        self.type = type;
        self.width = width;
        self.height = height;
        self.speed = 0;
        self.angle = 0;
        self.moveAngle = 0;
        self.x = x;
        self.y = y;
        self.color = color;
    }

    componentUpdate() {
        let self = this;
        let ctx = self.context
        ctx.save();
        ctx.translate(self.car.x, self.car.y);
        ctx.rotate(self.car.angle);
        ctx.fillStyle = self.car.color;
        ctx.fillRect(self.car.width / -2, self.car.height / -2, self.car.width, self.car.height);
        ctx.restore();
    }

    componentUpdateWheel() {
        let self = this;
        let ctx = self.context
        ctx.save();
        ctx.translate(self.fLeftWheel.x, self.fLeftWheel.y);
        ctx.rotate(self.fLeftWheel.angle);
        ctx.fillStyle = self.fLeftWheel.color;
        ctx.fillRect(self.fLeftWheel.width / -2, self.fLeftWheel.height / -2, self.fLeftWheel.width, self.fLeftWheel.height);
        ctx.restore();
    }

    componentWheelPos() {
        let self = this;
        self.fLeftWheel.angle += self.fLeftWheel.moveAngle * Math.PI / 180;

        var dxFLWheel = self.fLeftWheel.x + self.fLeftWheel.speed * Math.sin(self.fLeftWheel.angle);
        var dyFLWheel = self.fLeftWheel.y - self.fLeftWheel.speed * Math.cos(self.fLeftWheel.angle);

        if (dxFLWheel < (self.canvas.width - 15) && dxFLWheel > (self.fLeftWheel.width / 2)) {
            self.fLeftWheel.x = dxFLWheel;
        }
        if (dyFLWheel < (self.canvas.height - 15) && dyFLWheel > (self.fLeftWheel.width / 2)) {
            self.fLeftWheel.y = dyFLWheel;
        }
    }

    componentNewPos() {
        let self = this;
        self.car.angle += self.car.moveAngle * Math.PI / 180;

        var dxCar = self.car.x + self.car.speed * Math.sin(self.car.angle);
        var dyCar = self.car.y - self.car.speed * Math.cos(self.car.angle);

        if (dxCar < (self.canvas.width - 15) && dxCar > (self.car.width / 2)) {
            self.car.x = dxCar;
        }
        if (dyCar < (self.canvas.height - 15) && dyCar > (self.car.width / 2)) {
            self.car.y = dyCar;
        }
    }

    updateGameArea(self) {
        self.clearBoard();
        self.car.moveAngle = 0;
        self.car.speed = 0;
        self.fLeftWheel.moveAngle = 0;
        self.fLeftWheel.speed = 0;
        if (self.keys && self.keys[37] && self.keys[37].status) {
            if (self.keys[37].event == "keydown") {
                self.car.moveAngle = -1;
                self.fLeftWheel.moveAngle = -1;
            }
            if (self.keys[37].event == "keyup") {
                self.car.moveAngle = 0;
                self.fLeftWheel.moveAngle = 0;
            }
            self.componentWheelPos();
        }
        if (self.keys && self.keys[39]) {
            if (self.keys[39].event == "keydown") {
                self.car.moveAngle = 1;
                self.fLeftWheel.moveAngle = 1;
            }
            if (self.keys[39].event == "keyup") {
                self.car.moveAngle = 0;
                self.fLeftWheel.moveAngle = 0;
            }
            self.componentWheelPos();
        }
        if (self.keys && self.keys[38]) {
            if (self.keys[38].event == "keydown") {
                self.car.speed = 3;
                self.fLeftWheel.speed = 3;
                self.componentNewPos();
                self.componentWheelPos();
            }
        }
        if (self.keys && self.keys[40]) {
            if (self.keys[40].event == "keydown") {
                self.car.speed = -3;
                self.fLeftWheel.speed = -3;
                self.componentNewPos();
                self.componentWheelPos();
            }
        }
        self.componentUpdateWheel();
        //self.componentUpdate();
    }

    ngOnDestroy() {

    }
}
