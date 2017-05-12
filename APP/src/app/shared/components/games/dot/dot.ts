declare var require: any;
declare var $: any;

import {Component, OnInit, OnDestroy, Pipe, PipeTransform, Output, Input, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Config} from '../../../../config/config';

@Component({
    selector: 'Dot',
    styleUrls: ['./dot.css'],
    templateUrl: './dot.html'
})

export class Dot implements OnInit, OnDestroy {
    @ViewChild('canvas') canvasBoard: ElementRef;  
    private canvas: any;
    private context: any;
    private xx: number;
    private yy: number;
    private status: boolean = false;

    private lineDraw: number = 0;

    private type: any;
    private width: number;
    private height: number;
    private speed: number;
    private angle: number;
    private moveAngle: number;
    private x: number;
    private y: number;
    private color: any;
    private radius: any;
    private fromX: number;
    private fromY: number;

    private lines: any[] = [];

    private rect: any[] = [];

    private temp: any;

    private dotArray: any[] = [];

    constructor(public element: ElementRef) {

        this.temp = {
            x: 0,
            y: 0,
            tox: 0,
            toy: 0
        }

        this.xx = 0;
        this.yy = 0;


        this.dotArray = [
            {
                "id": 1,
                "left": "10px",
                "top": "10px",
            }
        ]
    }

    dotComponent(radius: number, width: number, height: number, color: any, x: number, y: number, type: any, speed: number, self: any) {
        this.type = type;
        this.width = 10;
        this.height = 20;
        this.speed = speed;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
        this.color = color;

        this.radius = radius;
        var ctx = self.context;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    lineComponent(lineWidth: number, width: number, height: number, color: any, x: number, y: number, fromX: number, fromY: number, type: any, speed: number, self: any) {
        this.type = type;
        this.width = 10;
        this.height = 20;
        this.speed = speed;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
        this.fromX = fromX;
        this.fromY = fromY;
        this.color = color;
        var ctx = self.context;
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.moveTo(x, y);
        ctx.lineTo(fromX, fromY);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    rectComponent(lineWidth: number, width: number, height: number, color: any, x: number, y: number, fromX: number, fromY: number, type: any, speed: number, self: any) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
        this.color = color;
        var ctx = self.context;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    initBoard() {
        let self = this;
        this.canvas = document.getElementById("canvas");
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        // self.canvas.addEventListener('mousemove', function (e) {
        //     self.lines.forEach((element) => {
        //         let ddd = self.RectCircleColliding(element, e);
        //         self.status = ddd
        //     })
        // })

        self.canvas.addEventListener("click", function (e) {
            self.lines.forEach((element) => {
                let ddd = self.RectCircleColliding(element, e);
                self.status = ddd
                if (ddd) {
                    let ctx = self.context;
                    ctx.beginPath();
                    ctx.lineCap = "round";
                    ctx.moveTo(element.x, element.y);
                    ctx.lineTo(element.fromX, element.fromY);
                    ctx.fillStyle = "red";
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 5;
                    ctx.stroke();
                } else {
                    let ctx = self.context;
                    ctx.beginPath();
                    ctx.lineCap = "round";
                    ctx.moveTo(element.x, element.y);
                    ctx.lineTo(element.fromX, element.fromY);
                    ctx.fillStyle = "#000";
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }

            })


            // self.RectCircleColliding(self.lines[0], e);
            self.temp.x = self.lines[0].x;
            self.temp.y = self.lines[0].y;
            self.temp.tox = self.lines[0].fromX;
            self.temp.toy = self.lines[0].fromY;
            self.xx = e.x;
            self.yy = e.y - 137;
            console.log(e);
        }, false);
    }

    RectCircleColliding(line, pointer) {
        if (pointer.x >= (line.x - 5) && pointer.x <= (line.fromX + 5) && (pointer.y - 140) >= (line.y - 5) && (pointer.y - 140) <= (line.fromY + 5)) {
            return true;
        }
        return false;
    }

    ngOnInit() {
        let self = this;

        // this.initBoard();
        // let x: number = 0;
        // let y: number = 0;

        // for (let i = 0; i < 5; i++) {
        //     y = 0;
        //     x += 50;
        //     for (let j = 0; j < 5; j++) {
        //         y += 50;
        //         if (i != 4) {
        //             self.lines.push(new this.lineComponent(5, 5, 5, "#000", x, y, x + 50, y, "", 0, this));
        //         }

        //         if (j != 4) {
        //             self.lines.push(new this.lineComponent(5, 5, 5, "#000", x, y, x, y + 50, "", 0, this));
        //         }

        //         if (i != 4 && j != 4) {
        //             self.rect.push(new this.rectComponent(5, 50, 50, "#fff", x + 2, y + 2, x, y, "", 0, this));
        //         }

        //         let vDot = new this.dotComponent(5, 5, 5, "#f01", x, y, "", 0, this);
        //     }
        // }

        console.log(this.canvasBoard.nativeElement);

        this.canvasBoard.nativeElement.style.height = "500px";
        this.canvasBoard.nativeElement.style.width = "500px";
        this.canvasBoard.nativeElement.style.backgroundColor = "#cccccc";

        

    }

    ngOnDestroy() {
    }

    runCode() {
        let self = this;
        if (self.lines[self.lineDraw]) {
            let ctx = self.context;
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.moveTo(self.lines[self.lineDraw].x, self.lines[self.lineDraw].y);
            ctx.lineTo(self.lines[self.lineDraw].fromX, self.lines[self.lineDraw].fromY);
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            ctx.stroke();
            self.lineDraw++;
        }
    }
}