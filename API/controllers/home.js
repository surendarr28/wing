"use strict";
const service = require("../services/index");

class HomeController extends service {
    constructor() {
        super()
    }

    get getHome() {
        return this.home.serviceHome;
    }
}

module.exports = new HomeController();
