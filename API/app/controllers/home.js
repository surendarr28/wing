"use strict";

class HomeController {
    constructor() {
        this.init = this.home();
    }

    home() {
        return function (req, res, next) {
            res.send("home");
        }
    }
}
module.exports = new HomeController();
