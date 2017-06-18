module.exports = function (app, connection, P) {

    app.get('/getRandomTeam', function(req, res) {
        var poke_1 = 1;
        var poke_2 = 1;
        var poke_3 = 1;
        while (poke_1 === poke_2 || poke_1 === poke_3 || poke_2 === poke_3) {
            poke_1 = Math.floor((Math.random() * 721) + 1);
            poke_2 = Math.floor((Math.random() * 721) + 1);
            poke_3 = Math.floor((Math.random() * 721) + 1);
        }
        connection.query('CALL generateRandomTeam(' + poke_1 + ", " + poke_2 + ", " + poke_3 + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })
    });


    app.post('/add2Team', function(req, res) {
        var ownsId = req.body.ownsId;
        var userId = req.body.userId;
        connection.query('CALL update_favirote(' + userId + ", " + ownsId + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })
    });

    app.post('/generateAPokemon', function(req, res) {
        var uid = req.body.uid;
        var pid = req.body.pid;

        var randomHP = Math.random();
        if (randomHP < 0.5) {
            randomHP -= 1;
        } else {
            randomHP -= 0.5;
        }
        var b_hp = Math.floor(randomHP * 10);

        var randomAttack = Math.random();
        if (randomAttack < 0.5) {
            randomAttack -= 1;
        } else {
            randomAttack -= 0.5;
        }
        var b_attack = Math.floor(randomAttack * 10);

        var randomDefense = Math.random();
        if (randomDefense < 0.5) {
            randomDefense -= 1;
        } else {
            randomDefense -= 0.5;
        }
        var b_defense = Math.floor(randomDefense * 10);

        var randomSA = Math.random();
        if (randomSA < 0.5) {
            randomSA -= 1;
        } else {
            randomSA -= 0.5;
        }
        var b_sa = Math.floor(randomSA * 10);

        var randomSD = Math.random();
        if (randomSD < 0.5) {
            randomSD -= 1;
        } else {
            randomSD -= 0.5;
        }
        var b_sd = Math.floor(randomSD * 10);

        var randomSPEED = Math.random();
        if (randomSPEED < 0.5) {
            randomSPEED -= 1;
        } else {
            randomSPEED -= 0.5;
        }
        var b_speed = Math.floor(randomSPEED * 10);

        connection.query('CALL add_new_own(' + uid + ", " + pid + ", " + b_hp + ", " + b_attack + ", " + b_defense +
            ", " + b_sa + ", " + b_sd + ", " + b_speed + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })


    });

    app.post('/initUserBattleTeam', function(req, res) {
        var userId = req.body.userId;
        connection.query('CALL get_favorite_pokemon_by_uid(' + userId + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })
    });

    app.post('/initUserPokemons', function(req, res) {
        var userId = req.body.userId;
        connection.query('CALL get_pokemon_by_uid(' + userId + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })
    });

    app.post('/userLogin', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        connection.query('CALL find_user_by_credential(' + "'" + username + "', " + "'" + password + "'" + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            if (rows[0].length === 1) {
                res.json(rows)
            } else {
                res.status(400).send("Wrong username or password");
            }
        })
    });


    app.post('/getUserById', function (req, res) {
        var uid = req.body.userId;
        connection.query('CALL get_user_by_id(' + uid + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })
    });


    app.post('/getPokemonByType', function (req, res) {
        var type = req.body.poke_type;
        var typeList = ['fire', 'grass', 'fighting', 'water', 'psychic', 'electric', 'normal', 'ice', 'poison', 'ground', 'flying',
                        'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
        if (typeList.includes(type)) {
            connection.query('CALL get_pokemon_by_type(' + "'" + type + "'" + ');', function (err, rows) {
                 if (err) {
                     res.sendStatus(404)
                 }
                 res.json(rows)
             })
        } else {
            if (parseInt(type) == type) {
                connection.query('CALL get_pokemon_by_id(' + "'" + type + "'" + ');', function (err, rows) {
                     if (err) {
                         res.sendStatus(404)
                     }
                     res.json(rows)
                 })
            } else {
                connection.query('CALL get_pokemon_by_name(' + "'" + type + "'" + ');', function (err, rows) {
                     if (err) {
                         res.sendStatus(404)
                     }
                     res.json(rows)
                 })
            }
        }

    });

    app.post('/registeration', function(req, res) {
        var uid = req.body.uid;
        var username = req.body.username;
        var password = req.body.password;
        connection.query('CALL regisration(' + uid + ", '" + username + "', " + "'" + password + "'" + ');',function(err,rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.json(rows)
        })
    });

    app.delete('/deletePokemon/:ownsId', function (req, res) {
        var oid = req.params['ownsId']
        connection.query('CALL delete_pokemon(' + oid + ');', function (err, rows) {
            if (err) {
                res.sendStatus(404)
            }
            res.sendStatus(200)
        })
    })

    // function getAllName() {
    //     for (i = 300; i < 310; i++) {
    //         P.getPokemonByName(i)
    //             .then(function (response) {
    //                 var sqlAddCommand = "INSERT INTO pokemons(poke_id, poke_name, hp, attack, defense, sp_attack, sp_defense, speed, poke_type) VALUES (" +  response.id + "," + "'"
    //                 + response.name + "'" + "," + response.stats[0].base_stat + "," + response.stats[1].base_stat + "," + response.stats[2].base_stat + "," + response.stats[3].base_stat + "," + response.stats[4].base_stat
    //                 + "," + response.stats[5].base_stat + "," + "'" + response.types[0].type.name + "'" + ")"
    //                 connection.query(sqlAddCommand, function (err, rows) {
    //                     if (err) {
    //                         console.log('err')
    //                     }
    //                     console.log(rows)
    //                 })
    //                 // console.log(result[i])
    //             })
    //     }
    // }
}
