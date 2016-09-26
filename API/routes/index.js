
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
        var gameCard = [
            {
                id: 100,
                team: "Quick Play - Red",
                members: "10",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1
            },
            {
                id: 101,
                team: "Quick Play - Green",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1
            },
            {
                id: 102,
                team: "Quick Play - Yellow",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1
            },
            {
                id: 103,
                team: "Quick Play - blue",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1
            },
            {
                id: 200,
                team: "Bet(10) - Red",
                members: "10",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2
            },
            {
                id: 201,
                team: "Bet(50) - Green",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2
            },
            {
                id: 202,
                team: "Bet(60) - Yellow",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2
            },
            {
                id: 203,
                team: "Bet(100) - blue",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2
            }
        ];
        io.of("/home").on('connection', function (socket) {
            socket.on('getlist', function (data) {
                socket.emit('dashboardlist', gameCard);
            });
            socket.emit('dashboardlist', gameCard);

            socket.on('updatelist', function (data) {
                gameCard.forEach((game) => {
                    if (game.id == data.id) {
                        game.status = data.status;
                    }
                });

                socket.broadcast.emit('dashboardlist', gameCard);
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
