"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes = require("./API/routes/index");
const service = require("./API/services/index");
const socketIo = require('socket.io');
const http = require('http');
const expressJwt = require('express-jwt');
const APP_CONFIG = require("./API/config/appConfig");
const jwtLib = require("./API/handler/jwtlib");

class Server {
    constructor() {
        this.apiRoute;
        this.app = express();
        this.server = http.Server(this.app);
        this.io = socketIo(this.server);
        this.config();
        this.routes();
        this.listening();
        this.socket();
    }

    static bootstrap() {
        return new Server();
    }

    config() {
        global.path = __dirname;
        this.app.use(bodyParser.json());
        this.app.use(express.static(global.path + '/APP/src'));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this.app.use(APP_CONFIG.ROUTE.PREFIX,
            expressJwt({ secret: APP_CONFIG.JWT_SECRET_KEY })
                .unless({ path: [APP_CONFIG.ROUTE.AUTH_URL.LOGIN, APP_CONFIG.ROUTE.AUTH_URL.REGISTRATION] }));

        this.app.use(function (err, req, res, next) { jwtLib.errorVerification(err, req, res, next); });
        this.app.use(function (req, res, next) { jwtLib.beforeVerfication(req, res, next); });
    }

    routes() {
        let router = express.Router();
        this.apiRoute = routes.bootstrap(this.app, express, router);
        this.app.use(this.apiRoute.init);
        service.bootstrap();

    }

    listening() {
        this.server.listen(8085, function () {
            console.log('Listening on port ' + 8085);
        });
    }

    socket() {
        this.apiRoute.socketNamespace(this.io);
    }
}
var server = Server.bootstrap();