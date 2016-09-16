"use strict";

class About {
    constructor(controllers, router) {
        this.controllers = controllers;
        this.router = router;
    }

    about() {
        this.router.get("/about", this.controllers.getAbout.bind(this.controllers.getAbout));
        return this.router;
    }

    static bootstrap(controllers, router) {
        return new About(controllers, router);
    }
}

module.exports = About;
