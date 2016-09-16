"use strict";
const service = require("../services/index");

class AboutController extends service {
    constructor() {
        super()
    }

    get getAbout() {
        return this.about.serviceAbout;
    }
}
module.exports = new AboutController();
