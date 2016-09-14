"use strict";

class Home {
    constructor(app, express, controllers, router) {
        this.init = this.home(app, express, controllers, router);
    }

    home(app, express, controllers, router) {
        router.get("/", controllers.getHome.bind(controllers.getHome));
        router.get("/home", controllers.getHome.bind(controllers.getHome));
        return router;
    }

    static bootstrap(app, express, controllers, router) {
        return new Home(app, express, controllers, router);
    }
}

module.exports = Home;
