"use strict";

class AboutController {
    constructor() {
        this.init = this.about();
    }

    about() {
        return function (req, res, next) {
            res.send("about");
        }
    }
}
module.exports = new AboutController();
