
const controllers = require("../controllers/index");

class Route {
    constructor(app, express, router) {
        this.auth = controllers.auth;
        this.dashboard = controllers.dashboard;
        this.apiPrefix = "/api/v1/";
        this.init = this.routing(router);
    }

    routing(router) {
        router.post(this.apiPrefix + "registration", this.generate(this.auth.Registration));
        router.post(this.apiPrefix + "login", this.generate(this.auth.Login));
        router.get(this.apiPrefix + "dashboard", this.generate(this.dashboard.Dashboard));

        router.get("**", function (req, res) {
            res.sendFile(global.path + "/APP/dist/index.html");
        });
        
        return router;
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
                socket.emit('news', { hello: 'worldssss' });
                socket.on('chat', function (data) {
                    socket.emit('message', data);
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
