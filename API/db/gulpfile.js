var gulp = require('gulp');
var mysql = require('mysql');
var db = require('../config/dbConfig');
var connection = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DATABASE
});

var fs = require('fs');
var files = ["user", "login", "role", "email", "phone", "gametype", "game", "ground", "contest", "member", "score"];

gulp.task('migrate', function (callback) {
    connection.connect();

    files.forEach((fileName) => {
        var contents = fs.readFileSync('./migrations/create.' + fileName + '.sql', 'utf8');
        connection.query(contents, function (err, rows, fields) {
            if (err) throw err;

            console.log(fileName, 'table created');
        });
    })

    connection.end();
})