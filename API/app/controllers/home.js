"use strict";

class HomeController {
    constructor() {
    }

    getHome() {
        return function (req, res, next) {
            res.send("home");

        }
    }

    postHome() {
        return function (req, res, next) {
            res.send("home");
        }
    }

    putHome() {
        return function (req, res, next) {
            res.send("home");
        }
    }

    deleteHome() {
        return function (req, res, next) {
            res.send("home");
        }
    }
}


module.exports = new HomeController();
