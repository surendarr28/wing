"use strict";

class Home {
    constructor(controllers, router) {
        this.controllers = controllers;
        this.router = router;
    }

    home() {
        this.router.get("/", this.controllers.getHome.bind(this.controllers.getHome));
        this.router.get("/home", this.controllers.getHome.bind(this.controllers.getHome));
        return this.router;
    }

    static bootstrap(controllers, router) {
        return new Home(controllers, router);
    }
}

module.exports = Home;
