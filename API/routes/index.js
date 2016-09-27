
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
        var userStacks = [];
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
                                findMember.score = gameaction(data);
                            }
                        });
                        socket.emit('sendgamecard', findGame);
                        socket.broadcast.emit('sendgamecard', findGame);
                    }
                });
            });

            socket.on('getstack', function (data) {
                var pipeArray = [];
                var left = 0;
                var top = 0;
                for (var i = 0; i < 10; i++) {
                    top += 10;
                    left += 10;
                    var vvValue = ['A', 'B'][Math.floor(Math.random() * 2)];
                    var data = {
                        value: vvValue,
                        styles: {
                            top: top,
                            left: left,
                        },
                        index: i,
                        eClass: vvValue == "A" ? "cell-two" : "cell-one"
                    }
                    pipeArray.push(data);
                }

                socket.emit('sendstack', pipeArray);

                var dataUpdateStatus = false;
                userStacks.forEach((element) => {
                    if (element.userId == data.userId) {
                        element.stack = pipeArray;
                        element.score = 0;
                        dataUpdateStatus = true;
                    }
                })

                if (!dataUpdateStatus) {
                    var data = {
                        id: userStacks.length + 1,
                        userId: data.userId,
                        stack: pipeArray,
                        score: 0,
                        left: 0,
                        top: 0,
                        rightChange: false,
                        errorChange: false,
                        leftChange: false
                    }
                    userStacks.push(data);
                }
            });


            socket.on('generatetime', function (data) {
                function countdown(minute) {
                    var seconds = 60;
                    var mins = minute;
                    function tick() {
                        var current_minutes = mins - 1
                        seconds--;
                        socket.emit('ticktick', current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds));
                        if (seconds > 0) {
                            setTimeout(tick, 1000);
                        } else {
                            if (mins > 1) {
                                setTimeout(function () { countdown(mins - 1); }, 1000);
                            } else {
                                socket.emit('ticktick', "completed");
                            }
                        }
                    }
                    tick();
                } 
                countdown(data.minute);
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

        function gameaction(data) {
            var currentUserStatck = userStacks.filter((user) => {
                return user.userId == data.userId;
            })
            var score = 0;
            switch (data.action) {
                case 'left':
                    var vvValue = ['A', 'B'][Math.floor(Math.random() * 2)];
                    var data = {
                        value: vvValue,
                        index: 9,
                    }

                    userStacks.forEach((user) => {
                        if (user.userId == data.userId) {
                            user.stack.push(data);
                            var rmData = user.stack.splice(0, 1);
                            if (rmData[0].value == "A") {
                                user.score += 10;
                            } else {
                                user.score -= 5;
                            }
                            score = user.score;
                        }
                    })
                    break;
                case 'right':
                    var vvValue = ['A', 'B'][Math.floor(Math.random() * 2)];
                    var data = {
                        value: vvValue,
                        index: 9,
                    }

                    userStacks.forEach((user) => {
                        if (user.userId == data.userId) {
                            user.stack.push(data);
                            var rmData = user.stack.splice(0, 1);
                            if (rmData[0].value == "B") {
                                user.score += 10;
                            } else {
                                user.score -= 5;
                            }
                            score = user.score;
                        }
                    })
                    break;
            }

            return score;
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
