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
    private socket: any;
    private message: string;
    private room: string = '222';
    private pipeArray: any = [];
    private jwtHelper: JwtHelper = new JwtHelper();
    private userData: any;
    private leftChange: boolean = false;
    private rightChange: boolean = false;
    private errorChange: boolean = false;
    private score: number = 0;
    private left: number = 0;
    private right: number = 0;
    private timer: any = "";
    private start: boolean = false;
    private intervelTimer: any = 0;
    private deckCards: any;


    constructor(private route: ActivatedRoute, private _config: Config, private router: Router) {
        let self = this;
        self.socket = io(self._config.SocketBaseUrl() + 'uno');
        self.userData = self.jwtHelper.decodeToken(localStorage.getItem('currentUser'));
        console.log(self);
        this.deckCards = this.createCardStack();
    }

    ngOnInit() {

    }

    createCardStack() {
        var cardRules = [
            {
                ruleId: 1,
                ruleMessage: "Same Color",
            },
            {
                ruleId: 2,
                ruleMessage: "Same number or symbol",
            },
            {
                ruleId: 3,
                ruleMessage: "Skip the player",
            },
            {
                ruleId: 4,
                ruleMessage: "Change apposite direction",
            },
            {
                ruleId: 5,
                ruleMessage: "Take two card from deck",
            },
            {
                ruleId: 6,
                ruleMessage: "Take four card from deck",
            },
            {
                ruleId: 7,
                ruleMessage: "Change the color",
            }
        ]
        var deckCards = [];

        var colors = [
            { color: "red", code: "r" },
            { color: "green", code: "g" },
            { color: "yellow", code: "y" },
            { color: "blue", code: "b" }
        ];

        var powerCard = [
            {
                cardValue: 'S',
                cardCode: "s",
                rule: 3
            },
            {
                cardValue: 'R',
                cardCode: "r",
                rule: 4
            },
            {
                cardValue: '2+',
                cardCode: "d2",
                rule: 5
            }
        ];

        // number cards [1-9]
        for (var i = 1; i <= 9; i++) {
            for (var j = 0; j < colors.length; j++) {
                for (var k = 1; k <= 2; k++) {
                    var card = {
                        id: "n-" + colors[j].code + "-c" + i,
                        cardValue: i.toString(),
                        cardColor: colors[j].color,
                        cardRules: [1, 2]
                    }
                    deckCards.push(card);
                }
            }
        }

        //  power cards [2+, skip, reverse]
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < colors.length; j++) {
                for (var k = 1; k <= 2; k++) {
                    var card = {
                        id: "p-" + colors[j].code + "-c" + powerCard[i].cardCode,
                        cardValue: powerCard[i].cardValue,
                        cardColor: colors[j].color,
                        cardRules: [powerCard[i].rule]
                    }
                    deckCards.push(card);
                }
            }
        }

        // number cards [0] and power cards [4+, c]
        for (var i = 0; i < 4; i++) {
            var card = {
                id: "n-" + colors[i].code + "-c0",
                cardValue: "0",
                cardColor: colors[i].color,
                cardRules: [1, 2]
            }
            deckCards.push(card);
            var card = {
                id: "p-c-d4",
                cardValue: "4+",
                cardColor: "#607d8b",
                cardRules: [6, 7]
            }
            deckCards.push(card);
            var card = {
                id: "p-c-dc",
                cardValue: "C",
                cardColor: "#607d8b",
                cardRules: [7]
            }
            deckCards.push(card);
        }

        console.log(deckCards);
        console.log(deckCards.length);
        return deckCards;
    }

    ngOnDestroy() {
        this.socket.disconnect();
    }
}
