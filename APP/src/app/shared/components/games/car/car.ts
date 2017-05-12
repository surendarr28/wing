declare var require: any;
declare var $: any;

import {Component, OnInit, OnDestroy, Pipe, PipeTransform, Output, Input, EventEmitter} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Config} from '../../../../config/config';

@Component({
    selector: 'Car',
    styleUrls: ['./car.css'],
    templateUrl: './car.html'
})

export class Car implements OnInit, OnDestroy {

    private car: any;
    private traffics: any = [];
    private roads: any = [];

    private type: any;
    private width: any;
    private height: any;
    private speed: any;
    private angle: any;
    private color: any;
    private moveAngle: any;
    private x: any;
    private y: any;

    private canvas: any;
    private context: any;
    private interval: any;
    private boomsInterval: any;
    private roadsInterval: any;

    private keys: any = [];

    constructor() {

    }

    carComponent(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    updateCar(self) {
        var ctx = self.context;
        ctx.save();
        ctx.translate(self.car.x, self.car.y);
        ctx.rotate(self.car.angle);
        ctx.fillStyle = self.car.color;
        ctx.fillRect(self.car.width / -2, self.car.height / -2, self.car.width, self.car.height);
        ctx.restore();
    }

    carPossition(self) {
        var dx = self.car.x + self.car.speed;
        if (dx > 220 && dx < 580) {
            self.car.x = dx;
        }
    }

    trafficComponent(width, height, color, x, y, type, speed) {
        this.type = type;
        this.width = 10;
        this.height = 20;
        this.speed = speed;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
    }

    trafficUpdate(self, traffic) {
        var ctx = self.context;
        ctx.save();
        if (self.RectCircleColliding(self.car, traffic)) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "green";
        }
        ctx.translate(traffic.x, traffic.y);

        ctx.fillRect(traffic.width / -2, traffic.height / -2, traffic.width, traffic.height);
        ctx.restore();
    }

    trafficNewPos(traffic) {
        var dx = traffic.x;
        var dy = traffic.y - traffic.speed * Math.cos(traffic.angle);
        traffic.y = dy;
        traffic.x = dx;
    }

    roadMark(width, height, color, x, y, type) {
        this.type = type;
        this.width = 20;
        this.height = 150;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    roadUpdate(self, road) {
        var ctx = self.context;
        ctx.save();
        ctx.translate(road.x, road.y);
        ctx.fillStyle = road.color;
        ctx.fillRect(road.width / -2, road.height / -2, road.width, road.height);
        ctx.restore();
    }

    roadNewPos(road) {
        var dx = road.x;
        var dy = road.y - road.speed * Math.cos(road.angle);
        road.y = dy;
        road.x = dx;
    }

    startGame() {
        let self = this;
        this.canvas = document.getElementById("canvas");
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(function () { self.updateGameArea(self) }, 20);
        this.boomsInterval = setInterval(function () { self.updateBooms(self) }, 2000);
        this.roadsInterval = setInterval(function () { self.updateRoads(self) }, 500);

        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            self.keys = (self.keys || []);
            self.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            self.keys[e.keyCode] = (e.type == "keydown");
        })
    }

    stop() {
        clearInterval(this.interval);
        clearInterval(this.boomsInterval);
        clearInterval(this.roadsInterval);
    }

    clearBoard() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    RectCircleColliding(object1, object2) {
        if (object1.x < object2.x + (object2.width + 10) && object1.x + (object1.width - 8) > object2.x &&
            object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
            return true;
        }
        return false;
    }

    updateGameArea(self) {
        self.clearBoard();
        self.car.moveAngle = 0;
        self.car.speed = 0;
        self.roads.forEach((road) => {
            road.speed = 0;
        })
        if (self.keys && self.keys[37]) {
            self.car.speed = -6;
        }
        if (self.keys && self.keys[39]) {
            self.car.speed = 6;
        }
        if (self.keys && self.keys[38]) {
        }
        if (self.keys && self.keys[40]) {
        }
        self.carPossition(self);
        self.updateCar(self);
        self.traffics.forEach((traffic) => {
            self.trafficNewPos(traffic);
            self.trafficUpdate(self, traffic);
        })

        self.roads.forEach((road) => {
            road.speed = -10;
            self.roadNewPos(road);
            self.roadUpdate(self, road);
        })
    }

    updateBooms(self) {
        self.traffics.push(new self.trafficComponent(10, 10, "blue", Math.round(Math.random() * (600 - 200)) + 200, 0, "", -2));
        self.traffics.push(new self.trafficComponent(10, 10, "blue", Math.round(Math.random() * (600 - 200)) + 200, 0, "", -5));
        self.traffics.push(new self.trafficComponent(10, 10, "blue", Math.round(Math.random() * (600 - 200)) + 200, 0, "", -3));
        self.traffics.push(new self.trafficComponent(10, 10, "blue", Math.round(Math.random() * (600 - 200)) + 200, 0, "", -6));
        self.traffics.push(new self.trafficComponent(10, 10, "blue", Math.round(Math.random() * (600 - 200)) + 200, 0, "", -8));
    }

    updateRoads(self) {
        self.roads.push(new self.roadMark(10, 10, "white", 200, 0, ""));
        self.roads.push(new self.roadMark(10, 10, "white", 600, 0, ""));
    }

    ngOnInit() {
        this.car = new this.carComponent(30, 30, "red", 480, 480, "");
        this.startGame();
    }

    ngOnDestroy() {
    }
}