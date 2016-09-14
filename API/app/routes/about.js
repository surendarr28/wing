"use strict";

class About {
    constructor(app, express, controllers, router) {
        this.init = this.about(app, express, controllers, router);
    }

    about(app, express, controllers, router) {
        router.get("/about", controllers.init.bind(controllers.init));
        return router;
    }

    static bootstrap(app, express, controllers, router) {
        return new About(app, express, controllers, router);
    }
}

module.exports = About;
