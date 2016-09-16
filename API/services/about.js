"use strict";

const index = require("./index");

class About {
    constructor(db) {
        this.db = db;
    }

    get serviceAbout() {
        let self = this;

        return function (req, res, next) {
            self.db
                .authenticate()
                .then(function (err) {
                    console.log('Connection has been established successfully.');
                    res.send('ABOUT Connection has been established successfully.');
                })
                .catch(function (err) {
                    console.log('Unable to connect to the database:', err);
                    res.send('ABOUT Unable to connect to the database:');
                });
        }
    }

    static bootstrap(db) {
        return new About(db);
    }
}

module.exports = About;
