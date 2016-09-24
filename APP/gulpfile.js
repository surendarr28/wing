var fs = require('fs');

var gulp = require('gulp');

gulp.task('writecss', function (cb) {
    fs.writeFile(__dirname + '/src/app/shared/components/games/focus/focus.animation.css', generate(), cb);
});

function generate() {
    var left = 'left';
    var right = 'right';
    var data = [
        {
            position: left,
            count: 10,
            seconds: "0.5s",
        },
        {
            position: right,
            count: 10,
            seconds: "0.5s",
        }
    ];

    var string = "";
    string += generatekeyFrame(data);

    string += generateClass(data);
    return string;
}


function generatekeyFrame(data) {
    var string = "";
    data.forEach((element) => {
        for (var i = 0; i <= element.count; i++) {
            string += " @keyframes " + element.position + "--move" + i + " {to { opacity: 0; -webkit-transform: translate3d(-" + (element.count - i) * 10 + "px, -" + (element.count - i) * 10 + "px, " + (element.count - i) * 10 + "px); transform: translate3d(-" + (element.count - i) * 10 + "px, -" + (element.count - i) * 10 + "px, " + (element.count - i) * 10 + "px);} }"
        }
    })
    return string;
}

function generateClass(data) {
    var string = "";
    data.forEach((element) => {
        for (var i = 0; i <= element.count; i++) {
            string += "." + element.position + "-move" + i + " { animation: " + element.position + "--move" + i + " " + element.seconds + ";}";
        }
    })
    return string;
}