"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes = require("./API/routes/index");
const service = require("./API/services/index");
const socketIo = require('socket.io');
const http = require('http');

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