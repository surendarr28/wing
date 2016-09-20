
class Validation {
    constructor() {
    }

    registraion(reqData, service, cb) {
        var error = [];
        error = this.requireValidation(reqData);
        if (error.length == 0) {
            //check username.
            service.CheckUsername(reqData.vcUsername, function (data) {
                if (data > 0) {
                    var data = {
                        code: 2003,
                        message: "username already exit"
                    }
                    error.push(data);
                }
                //check email.
                service.CheckEmail(reqData.vcEmail, function (data) {
                    if (data > 0) {
                        var data = {
                            code: 2004,
                            message: "Email already exit"
                        }
                        error.push(data);
                    }
                    return cb(error);
                });
            });
        } else {
            return cb(error);
        }
    }

    requireValidation(reqData) {
        var error = [];
        error = this.requireValidationLogin(reqData);

        if (!reqData.vcEmail) {
            var data = {
                code: 2002,
                message: "email required"
            }
            error.push(data);
        }
        return error;
    }

    requireValidationLogin(reqData) {
        var error = [];
        if (!reqData.vcUsername) {
            var data = {
                code: 2000,
                message: "username required"
            }
            error.push(data);
        }

        if (!reqData.vcPassword) {
            var data = {
                code: 2001,
                message: "password required"
            }
            error.push(data);
        }
        return error;
    }
}

module.exports = new Validation();