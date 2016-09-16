"use strict";
const controllers = require("../controllers/index");

class Route {
    constructor(app, express, router) {
        this.init = null;
        this.home = controllers.home;
        this.about = controllers.about;
        this.init = this.routing(router);
    }

    routing(router) {
        router.get("/", this.home.getHome.bind(this.home.getHome));
        router.get("/home", this.home.getHome.bind(this.home.getHome));
        router.get("/about", this.about.getAbout.bind(this.about.getAbout));
        return router
    }

    static bootstrap(app, express, router) {
        return new Route(app, express, router);
    }
}

module.exports = Route;
