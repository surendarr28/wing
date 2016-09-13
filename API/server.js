"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes = require("./app/routes/index");

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.listening();
    }

    static bootstrap() {
        return new Server();
    }

    config() {
        global.path = __dirname;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

    routes() {
        routes.bootstrap(this.app, express);
    }

    listening() {
        this.app.listen(8085, function () {
            console.log('Listening on port ' + 8085);
        });
    }
}
var server = Server.bootstrap();