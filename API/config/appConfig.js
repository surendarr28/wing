var prefix = "/api/v1";

module.exports = {
    JWT_SECRET_KEY: "0!2#4%",
    ROUTE: {
        PREFIX: prefix,
        AUTH_URL: {
            LOGIN: prefix + "/login",
            REGISTRATION: prefix + "/registration",
        }
    }
}