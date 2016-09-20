
const CONFIG = require("../config/dbConfig");
class DB {
    constructor() {
        this.Sequelize = require('sequelize');
        this.database = new this.Sequelize(CONFIG.CONNECTION_STRING, {
            define: {
                timestamps: false
            }
        });
    }
}

module.exports = DB;
