
const DB = require("../models/db");

const auth = require("./auth");
const dashboard = require("./dashboard");


class Service extends DB {
    constructor() {
        super();
        this.auth = auth.bootstrap(this.database, this.Sequelize);
        this.dashboard = dashboard.bootstrap(this.database, this.Sequelize);
    }

    static bootstrap() {
        return new Service();
    }
}

module.exports = Service;
