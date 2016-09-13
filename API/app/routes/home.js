"use strict";

class Home {
    constructor(app, express, controllers) {
        this.init = this.home(app, express, controllers);
    }

    home(app, express, controllers) {
        let router = express.Router();
        router.get("/", controllers.init.bind(controllers.init));
        router.get("/home", controllers.init.bind(controllers.init));
        app.use(router);
    }

    static bootstrap(app, express, controllers) {
        return new Home(app, express, controllers);
    }
}

module.exports = Home;
