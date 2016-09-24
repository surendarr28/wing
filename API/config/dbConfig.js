const host = "127.0.0.1";
const user = "root";
const password = "Ss9715261931!";
const database = "wings";

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: password,
    DATABASE: database,
    //CONNECTION_STRING: "mysql://" + user + ":" + password + "@" + host + ":3306/" + database,
    CONNECTION_STRING: "mysql://" + user + "@" + host + ":3306/" + database,
}