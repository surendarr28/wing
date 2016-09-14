"use strict";
const controllers = require("../controllers/index");
const home = require("./home");
const about = require("./about");

class Route {
    constructor(app, express, router) {
        this.init = null;
        let homeRoute = home.bootstrap(app, express, controllers.home, router).init;
        let aboutRoute = about.bootstrap(app, express, controllers.about, router).init;
        this.init = Object.assign(homeRoute, aboutRoute);

    }

    static bootstrap(app, express, router) {
        return new Route(app, express, router);
    }
}
module.exports = Route;
