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
                    res.status(422).send(result);
                } else {
                    // register user.
                    self.AddUser({ vcEmail: req.body.vcEmail }, (user) => {
                        // add login data.
                        self.AddLogin({ vcUsername: req.body.vcUsername, vcPassword: md5(req.body.vcPassword), iUserId: user.iUserId }, (login) => {
                            delete login.dataValues.vcPassword;
                            login.dataValues.tbl_user = user;
                            login.dataValues.regToken = true;
                            var result = {
                                error: [],
                                result: jwtLib.generateToken(login.dataValues)
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
            var error = [];
            error = self.validation.requireValidationLogin(req.body);
            if (error.length > 0) {
                var result = {
                    error: error,
                    result: null
                };
                res.status(422).send(result);
            }
            self.CheckUsername(req.body.vcUsername, function (count) {
                if (count == 0) {
                    var data = {
                        code: 2005,
                        message: "username not available."
                    }
                    error.push(data);

                    var result = {
                        error: error,
                        result: null
                    };
                    res.status(422).send(result);
                } else {
                    self.GetLogin({ vcUsername: req.body.vcUsername, vcPassword: md5(req.body.vcPassword) }, function (userData) {
                        if (userData) {
                            userData.dataValues.regToken = false;
                            var result = {
                                error: [],
                                result: jwtLib.generateToken(userData.dataValues)
                            };
                            res.send(result);
                        } else {
                            var data = {
                                code: 2006,
                                message: "Password is incorrect."
                            }
                            error.push(data);

                            var result = {
                                error: error,
                                result: null
                            };
                            res.status(422).send(result);
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
