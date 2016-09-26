
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
                category: 1,
                game: []
            },
            {
                id: 101,
                team: "Quick Play - Green",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1,
                game: []
            },
            {
                id: 102,
                team: "Quick Play - Yellow",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1,
                game: []
            },
            {
                id: 103,
                team: "Quick Play - blue",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 1,
                game: []
            },
            {
                id: 200,
                team: "Bet(10) - Red",
                members: "10",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2,
                game: []
            },
            {
                id: 201,
                team: "Bet(50) - Green",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2,
                game: []
            },
            {
                id: 202,
                team: "Bet(60) - Yellow",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2,
                game: []
            },
            {
                id: 203,
                team: "Bet(100) - blue",
                members: "5",
                gameName: "focusing the block",
                gameCategory: "focus",
                status: 1,
                category: 2,
                game: []
            }
        ];
        var game = [];
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

        io.of("/join").on('connection', function (socket) {
            socket.on('getgamecard', function (data) {
                var requestedGameCard = gameCard.filter((game) => {
                    return game.id == data.id
                });

                try {
                    gameJoinManipulation(data, function (result) {
                        if (!result) {
                            var result = {
                                id: game.length + 1,
                                gamedetail: requestedGameCard[0],
                                status: 2,
                                members: [data.member]
                            }
                            game.push(result);
                        }
                        socket.emit('sendgamecard', result);
                        socket.broadcast.emit('sendgamecard', result);
                    })
                } catch (e) {
                    throw e;
                }
            });

            socket.on('getground', function (data) {
                game.forEach((findGame) => {
                    if (findGame.id == data.id) {
                        socket.emit('sendgamecard', findGame);
                        socket.broadcast.emit('sendgamecard', findGame);
                    }
                });
            })

            socket.on('updateScore', function (data) {
                game.forEach((findGame) => {
                    if (findGame.id == data.id) {
                        findGame.members.forEach((findMember) => {
                            if (findMember.userId == data.userId) {
                                findMember.score = data.score;
                            }
                        });
                        socket.emit('sendgamecard', findGame);
                        socket.broadcast.emit('sendgamecard', findGame);
                    }
                });
            })
        });

        function gameJoinManipulation(data, cb) {
            var getGame = game.filter((checkGame) => {
                return checkGame.gamedetail.id == data.id;
            })
            if (getGame && getGame.length > 0) {
                var getWaitingGame = getGame.filter((checkWaitingGame) => {
                    return checkWaitingGame.status == 2;
                })

                if (getWaitingGame && getWaitingGame.length > 0) {
                    game.forEach((pushToGame) => {
                        if (pushToGame.id == getWaitingGame[0].id) {
                            var findMembers = pushToGame.members.filter((findMember) => {
                                return findMember.userId == data.member.userId;
                            })
                            if (findMembers && findMembers.length > 0) {
                                cb(pushToGame);
                                return;
                            }
                            pushToGame.members.push(data.member);
                            cb(pushToGame);
                            return;
                        }
                    })

                } else {
                    cb(null);
                    return;
                }
            } else {
                cb(null);
                return;
            }
        }
    }

    generate(params) {
        return params.bind(params)
    }

    static bootstrap(app, express, router) {
        return new Route(app, express, router);
    }
}

module.exports = Route;
