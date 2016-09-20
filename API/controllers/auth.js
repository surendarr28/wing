
const service = require("../services/index");

class AuthController extends service {
    constructor() {
        super()
    }

    get Registration() {
        return this.auth.Registration;
    }

    get Login() {
        return this.auth.Login;
    }
}

module.exports = new AuthController();
