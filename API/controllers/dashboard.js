
const service = require("../services/index");

class DashboardController extends service {
    constructor() {
        super()
    }

    get Dashboard() {
        return this.dashboard.GetDashboard;
    }
}

module.exports = new DashboardController();
