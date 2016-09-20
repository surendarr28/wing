const md5 = require('js-md5');
const jwtLib = require('../handler/jwtlib');

class AuthService {
    constructor(db, Sequelize) {
        this.db = db;
        this.Sequelize = Sequelize;
        this.validation = require("../handler/validation");
        this.UserModel = require("../models/tbl_users")(this.db, this.Sequelize);
        this.LoginModel = require("../models/tbl_logins")(this.db, this.Sequelize);
        this.LoginModel.hasOne(this.UserModel, { foreignKey: 'iUserId' });
    }

    get Registration() {
        let self = this;
        let init = function (req, res, next) {
            // validation.
            self.validation.registraion(req.body, self, function (data) {
                if (data.length > 0) {
                    var result = {
                        error: data,
                        result: null
                    };
                    res.send(result);
                } else {
                    // register user.
                    self.AddUser({ vcEmail: req.body.vcEmail }, (user) => {
                        // add login data.
                        self.AddLogin({ vcUsername: req.body.vcUsername, vcPassword: md5(req.body.vcPassword), iUserId: user.iUserId }, (login) => {
                            user.dataValues.vcUsername = login.vcUsername;
                            var result = {
                                error: [],
                                result: user
                            };
                            res.send(result);
                        });
                    });
                }
            })
        }
        return init;
    }

    AddUser(data, cb) {
        this.UserModel.create(data)
            .then(function (user) {
                console.log(user.get('iUserId'));
                return cb(user);
            }).catch(function (error) {
                throw error;
            });
    }

    AddLogin(data, cb) {
        this.LoginModel.create(data)
            .then(function (login) {
                console.log(login.get('iLoginId'));
                return cb(login);
            }).catch(function (error) {
                throw error;
            });
    }

    GetLogin(data, cb) {
        let self = this;
        this.LoginModel.findOne(
            {
                include: [
                    {
                        model: self.UserModel,
                    }
                ],
                where: data
            })
            .then(function (login) {
                if (login) {
                    delete login.dataValues.vcPassword
                }
                return cb(login);
            }).catch(function (error) {
                throw error;
            });
    }

    CheckUsername(username, cb) {
        this.LoginModel.count(
            {
                where: { vcUsername: username }
            })
            .then(function (count) {
                return cb(count);
            })
            .catch(function (err) {
                throw err;
            });
    }

    CheckEmail(email, cb) {
        this.UserModel.count(
            {
                where: { vcEmail: email }
            })
            .then(function (count) {
                return cb(count);
            })
            .catch(function (err) {
                throw err;
            });
    }

    get Login() {
        let self = this;
        let init = function (req, res, next) {
            self.CheckUsername(req.body.vcUsername, function (count) {
                if (count == 0) {
                    var error = [];
                    var data = {
                        code: 2005,
                        message: "username not available."
                    }
                    error.push(data);

                    var result = {
                        error: error,
                        result: null
                    };
                    res.send(result);
                } else {
                    self.GetLogin({ vcUsername: req.body.vcUsername, vcPassword: md5(req.body.vcPassword) }, function (userData) {
                        if (userData) {
                            var result = {
                                error: [],
                                result: jwtLib.generateToken(userData.dataValues)
                            };
                            res.send(result);
                        } else {
                            var error = [];
                            var data = {
                                code: 2006,
                                message: "Password is incorrect."
                            }
                            error.push(data);

                            var result = {
                                error: error,
                                result: null
                            };
                            res.send(result);
                        }
                    })
                }
            })
        }
        return init;
    }

    static bootstrap(db, Sequelize) {
        return new AuthService(db, Sequelize);
    }
}

module.exports = AuthService;
