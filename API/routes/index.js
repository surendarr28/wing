"use strict";
const controllers = require("../controllers/index");

class Route {
    constructor(app, express, router) {
        this.init = null;
        this.home = controllers.home;
        this.about = controllers.about;
        this.init = this.routing(router);
    }

    routing(router) {
        let apiPrefix = "/api/v1/"
        router.get(apiPrefix + "getdashboard", this.generate(this.home.getHome));
        router.get(apiPrefix + "getjoinroom", this.generate(this.about.getAbout));
        router.get("**", function (req, res) {
            res.sendFile(global.path + "/APP/src/index.html");
        });
        return router
    }

    socketNamespace(io) {
        io.of("/home").on('connection', function (socket) {
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', function (data) {
                console.log(data);
            });
        });
        io.of("/score").on('connection', function (socket) {
            socket.on('join', function (data) {
                socket.join(data.room);
                socket.in(data.room).emit('news', { hello: 'worldssss' });
                socket.in(data.room).on('chat', function (data) {
                    socket.in(data.room).emit('message', data);
                });
            });

        });
    }

    generate(params) {
        return params.bind(params)
    }

    static bootstrap(app, express, router) {
        return new Route(app, express, router);
    }
}

module.exports = Route;
