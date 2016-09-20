class Dashboard {
    constructor(db, Sequelize) {
        this.db = db;
        this.Sequelize = Sequelize;
    }

    get GetDashboard() {
        let self = this;
        let init = function (req, res, next) {
            res.send("Dashboard");
        }
        return init;
    }

    static bootstrap(db, Sequelize) {
        return new Dashboard(db, Sequelize);
    }
}

module.exports = Dashboard;
