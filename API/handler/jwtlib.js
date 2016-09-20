const jwt = require('jsonwebtoken');
const APP_CONFIG = require('../config/appConfig');

class JwtLib {

    /**
     * jwt fetch token from header.
     */
    jwtFetch(req) {
        try {
            var tokens = req.headers['authorization'];
            var tokenArray = tokens.split(" ");
            if (tokenArray && tokenArray.length > 1) {
                return tokenArray[1].trim();
            }
        } catch (e) {
            console.log("fetch", e);
            return null;
        }
    }

    /**
    * generate token.
    */
    generateToken(data) {
        var token;
        token = jwt.sign(data, APP_CONFIG.JWT_SECRET_KEY);
        return token;
    }

    /**
    * refresh token.
    */
    referehsToken(decoded) {
        try {
            var token_exp,
                now,
                newToken;

            token_exp = decoded.exp;
            now = moment().unix().valueOf();

            if ((token_exp - now) < expire) {
                var user = decoded;
                newToken = this.generateToken(user, false);
                if (newToken) {
                    return newToken;
                }
            } else {
                return null;
            }
        } catch (e) {
            console.log("refreshtoken", e);
            return null;
        }
    };

    /**
    * verify token while error.
    */
    errorVerification(err, req, res, next) {
        try {
            var self = this;
            var token = self.jwtFetch(req);
            if (token) {
                jwt.verify(token, APP_CONFIG.JWT_SECRET_KEY,
                    function (err, decoded) {
                        if (err) {
                            return res.status(401).send("invalid token.");
                        }

                        let newToken = self.referehsToken(decoded);

                        if (newToken) {
                            res.set('Authorization', 'Bearer ' + newToken);
                            next();
                        } else {
                            res.set('Authorization', 'Bearer ' + token);
                            next();
                        }
                    });
            } else {
                return res.status(401).send("invalid token.");
            }
        } catch (e) {
            console.log("errorVerification", e);
            return res.status(401).send("invalid token.");
        }
    }

    /**
    * jwt token verfication.
    */
    beforeVerfication(req, res, next) {
        try {
            var self = this;
            var token = self.jwtFetch(req);

            if (token) {
                jwt.verify(token, APP_CONFIG.JWT_SECRET_KEY,
                    function (err, decoded) {
                        if (err) {
                            return res.status(401).send("invalid token.");
                        }

                        let newToken = self.referehsToken(decoded);

                        if (newToken) {
                            res.set('Authorization', 'Bearer ' + newToken);
                            next();
                        } else {
                            res.set('Authorization', 'Bearer ' + token);
                            next();
                        }
                    });
            }
            else {
                next();
            }
        } catch (e) {
            console.log("beforeApiCall", e);
            next();
        }
    }
}

module.exports = new JwtLib();