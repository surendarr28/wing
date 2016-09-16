"use strict";

const home = require("./home");
const about = require("./about");
const DB = require("./db");

class Service extends DB {
    constructor() {
        super();
        this.home = home.bootstrap(this.database);
        this.about = about.bootstrap(this.database);
    }

    static bootstrap() {
        return new Service();
    }
}

module.exports = Service;
