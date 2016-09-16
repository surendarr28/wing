"use strict";
const CONFIG = require("../../config/dbConfig");
class DB {
    constructor() {
        let Sequelize = require('sequelize');
        this.database = new Sequelize(CONFIG.CONNECTION_STRING, {
            define: {
                timestamps: false
            }
        });
    }
}

module.exports = DB;
