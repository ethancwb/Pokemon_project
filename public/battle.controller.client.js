(function () {
    angular
        .module('Pokemon-project')
        .controller('BattleController', BattleController)

    function BattleController($http, $routeParams, $interval) {
        var model = this;
        model.uid = $routeParams.userId;
        model.log1 = [];
        model.log2 = [];
        model.log3 = [];
        model.battleRecord1 = [];
        model.battleRecord2 = [];
        model.battleRecord3 = [];
        var result1 = 9;
        var result2 = 9;
        var result3 = 9;

        // function attack(r, log, gameId) {
        //     if (r[0] <= 0 || r[6] <= 0) {
        //         return;
        //     } else {
        //         var game_attack = Math.floor((Math.random() * (r[2] - r[1])) + r[1]);
        //         var game_defense = Math.floor((Math.random() * (r[10] - r[9])) + r[9]);
        //         var damage = 0;
        //         if (game_attack <= game_defense) {
        //             damage = 1;
        //         } else {
        //             damage = game_attack - game_defense;
        //         }
        //         r[6] -= damage;
        //         log.push('Game ' + gameId + ': Your pokemon made ' + damage + 'hp damage, your opponent has ' + r[6] + 'hp.');
        //         defense(r, log, gameId);
        //     }
        //
        // }

        // function defense(r, log, gameId) {
        //     if (r[0] <= 0 || r[6] <= 0) {
        //         return;
        //     } else {
        //         var game_attack = Math.floor((Math.random() * (r[8] - r[7])) + r[7]);
        //         var game_defense = Math.floor((Math.random() * (r[4] - r[3])) + r[3]);
        //         var damage = 0;
        //         if (game_attack <= game_defense) {
        //             damage = 1;
        //         } else {
        //             damage = game_attack - game_defense;
        //         }
        //         r[0] -= damage;
        //         log.push('Game ' + gameId + ': Your opponent made ' + damage + 'hp damage, your pokemon has ' + r[0] + 'hp.');
        //         attack(r, log, gameId);
        //     }
        // }

        function attack(r, log, gameId) {
            var attack_log = $interval(function() {
                $interval.cancel(attack_log);
                if (r[0] <= 0 && r[6] > 0) {
                    log.push('Game ' + gameId + ': You Lost!');
                    resultCheck(gameId, 0);
                    // $interval.cancel(attack_log);
                    return;
                } else if (r[0] > 0 && r[6] <= 0) {
                    log.push('Game ' + gameId + ': You Win!');
                    resultCheck(gameId, 1);
                    // $interval.cancel(attack_log);
                    return;
                } else {
                    // var game_attack = Math.floor((Math.random() * (r[2] - r[1])) + r[1]);
                    // var game_defense = Math.floor((Math.random() * (r[10] - r[9])) + r[9]);
                    var game_attack = r[1];
                    var game_defense = r[9];
                    var damage = 0;
                    if (game_attack <= game_defense) {
                        damage = 1;
                    } else {
                        damage = game_attack - game_defense;
                    }
                    r[6] -= damage;
                    log.push('Game ' + gameId + ': Your pokemon made ' + damage + 'hp damage, your opponent has ' + r[6] + 'hp.');
                    defense(r, log, gameId);
                }
            }, 100);
        }

        function defense(r, log, gameId) {
            var defense_log = $interval(function() {
                $interval.cancel(defense_log);
                if (r[0] <= 0 && r[6] > 0) {
                    log.push('Game ' + gameId + ': You Lost!');
                    resultCheck(gameId, 0);
                    // $interval.cancel(defense_log);
                    return;
                } else if (r[0] > 0 && r[6] <= 0) {
                    log.push('Game ' + gameId + ': You Win!');
                    resultCheck(gameId, 1);
                    // $interval.cancel(defense_log);
                    return;
                } else {
                    //var game_attack = Math.floor((Math.random() * (r[8] - r[7])) + r[7]);
                    var game_attack = r[7];
                    // var game_defense = Math.floor((Math.random() * (r[4] - r[3])) + r[3]);
                    var game_defense = r[3];
                    var damage = 0;
                    if (game_attack <= game_defense) {
                        damage = 1;
                    } else {
                        damage = game_attack - game_defense;
                    }
                    r[0] -= damage;
                    log.push('Game ' + gameId + ': Your opponent made ' + damage + 'hp damage, your pokemon has ' + r[0] + 'hp.');
                    attack(r, log, gameId);
                }
            }, 100);
        }













        function resultCheck(gameId, result) {
            var finalResult;
            if (gameId === 1) {
                result1 = result;
            } else if (gameId === 2) {
                result2 = result;
            } else if (gameId === 3) {
                result3 = result;
            }

            if (result1 != 9 && result2 != 9 && result3 != 9) {
                if (result1 + result2 + result3 === 2 || result1 + result2 + result3 === 3) {
                    finalResult = 1;
                } else {
                    finalResult = 0;
                }
                result1 = 9;
                result2 = 9;
                result3 = 9;
                var url = '/add2BattleHistory';
                var battle = {
                    bid: new Date().getUTCMilliseconds(),
                    uid: model.uid,
                    result: finalResult
                };
                return $http.post(url, battle)
                    .then(success, error)
                function success (response) {
                    return;
                }
                function error(err) {
                    model.error = err;
                }
            }
            return;
        }

        function battle(r, log, gameId) {
            if (r[5] >= r[11]) {
                attack(r, log, gameId)

            } else {
                defense(r, log, gameId)
            }

        }

        function init() {
            var uid = $routeParams.userId;
            var url = '/initUserBattleTeam';
            var userId = {
                userId: uid
            };
            return $http.post(url, userId)
                .then(getUserBattleTeam, error)
            function getUserBattleTeam (response) {
                model.userBattleTeam = response.data[0];
                var url = '/getRandomTeam';
                return $http.get(url)
                    .then(getRandomBattleTeam, error);
                    function getRandomBattleTeam(response) {
                        model.randomBattleTeam = response.data[0];
                        // 0: uhp; 1: ua; 2: usa; 3: ud; 4:usd; 5: uspeed; 6: chp; 7: ca; 8: csa; 9: cd; 10:csd; 11: cspeed;
                        model.battleRecord1 = [model.userBattleTeam[0].hp, model.userBattleTeam[0].attack,
                            model.userBattleTeam[0].sp_attack, model.userBattleTeam[0].defense,
                            model.userBattleTeam[0].sp_defense, model.userBattleTeam[0].speed,
                            model.randomBattleTeam[0].hp, model.randomBattleTeam[0].attack,
                            model.randomBattleTeam[0].sp_attack, model.randomBattleTeam[0].defense,
                            model.randomBattleTeam[0].sp_defense, model.randomBattleTeam[0].speed];
                        model.battleRecord2 = [model.userBattleTeam[1].hp, model.userBattleTeam[1].attack,
                            model.userBattleTeam[1].sp_attack, model.userBattleTeam[1].defense,
                            model.userBattleTeam[1].sp_defense, model.userBattleTeam[1].speed,
                            model.randomBattleTeam[1].hp, model.randomBattleTeam[1].attack,
                            model.randomBattleTeam[1].sp_attack, model.randomBattleTeam[1].defense,
                            model.randomBattleTeam[1].sp_defense, model.randomBattleTeam[1].speed];
                        model.battleRecord3 = [model.userBattleTeam[2].hp, model.userBattleTeam[2].attack,
                            model.userBattleTeam[2].sp_attack, model.userBattleTeam[2].defense,
                            model.userBattleTeam[2].sp_defense, model.userBattleTeam[2].speed,
                            model.randomBattleTeam[2].hp, model.randomBattleTeam[2].attack,
                            model.randomBattleTeam[2].sp_attack, model.randomBattleTeam[2].defense,
                            model.randomBattleTeam[2].sp_defense, model.randomBattleTeam[2].speed];
                        battle(model.battleRecord1, model.log1, 1);
                        battle(model.battleRecord2, model.log2, 2);
                        battle(model.battleRecord3, model.log3, 3);
                    }
                    function error (err) {
                        return err;
                    }

            }
            function error (err) {
                return err;
            }
        }

        // function battle_launcher() {
        //     // 0: uhp; 1: ua; 2: usa; 3: ud; 4:usd; 5: uspeed; 6: chp; 7: ca; 8: csa; 9: cd; 10:csd; 11: cspeed;
        //     var battleRecord1 = [model.userBattleTeam[0].hp, model.userBattleTeam[0].attack,
        //         model.userBattleTeam[0].sp_attack, model.userBattleTeam[0].defense,
        //         model.userBattleTeam[0].sp_defense, model.userBattleTeam[0].speed,
        //         model.randomBattleTeam[0].hp, model.randomBattleTeam[0].attack,
        //         model.randomBattleTeam[0].sp_attack, model.randomBattleTeam[0].defense,
        //         model.randomBattleTeam[0].sp_defense, model.randomBattleTeam[0].speed];
        //     var battleRecord2 = [model.userBattleTeam[1].hp, model.userBattleTeam[1].attack,
        //         model.userBattleTeam[1].sp_attack, model.userBattleTeam[1].defense,
        //         model.userBattleTeam[1].sp_defense, model.userBattleTeam[1].speed,
        //         model.randomBattleTeam[1].hp, model.randomBattleTeam[1].attack,
        //         model.randomBattleTeam[1].sp_attack, model.randomBattleTeam[1].defense,
        //         model.randomBattleTeam[1].sp_defense, model.randomBattleTeam[1].speed];
        //     var battleRecord3 = [model.userBattleTeam[2].hp, model.userBattleTeam[2].attack,
        //         model.userBattleTeam[2].sp_attack, model.userBattleTeam[2].defense,
        //         model.userBattleTeam[2].sp_defense, model.userBattleTeam[2].speed,
        //         model.randomBattleTeam[2].hp, model.randomBattleTeam[2].attack,
        //         model.randomBattleTeam[2].sp_attack, model.randomBattleTeam[2].defense,
        //         model.randomBattleTeam[2].sp_defense, model.randomBattleTeam[2].speed];
        //     battle(battleRecord1, model.log1, model.game1);
            // battle(battleRecord2, model.log2, model.game2);
            // battle(battleRecord3, model.log3, model.game3);
        // }

        init();
        //battle_launcher();
    }

})();
