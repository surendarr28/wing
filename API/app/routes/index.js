"use strict";
const controllers = require("../controllers/index");
const home = require("./home");

class Route {
    constructor(app, express) {
        home.bootstrap(app, express, controllers.home);
    }

    static bootstrap(app, express) {
        return new Route(app, express);
    }
}
module.exports = Route;
