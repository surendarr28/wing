"use strict";

const index = require("./index");

class Home {
    constructor(db) {
        this.db = db;
    }

    get serviceHome() {
        let self = this;

        return function (req, res, next) {
            self.db
                .authenticate()
                .then(function (err) {
                    console.log('Connection has been established successfully.');
                    res.send('HOME Connection has been established successfully.');
                })
                .catch(function (err) {
                    console.log('Unable to connect to the database:', err);
                    res.send('HOME Unable to connect to the database:');
                });

        }
    }

    static bootstrap(db) {
        return new Home(db);
    }
}

module.exports = Home;
