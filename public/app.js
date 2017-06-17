module.exports = function (app, connection, P) {

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
        connection.query('CALL get_pokemon_by_type(' + "'" + type + "'" + ');',function(err,rows) {
             if (err) {
                 res.sendStatus(404)
             }
             res.json(rows)
         })
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

    // function getAllUsers() {
    //     var sqlSelectCommand = "SELECT * FROM registered_users"
    //     var sqlAddCommand = "INSERT INTO registered_users(user_id, user_type, user_name, user_password, tier) VALUES (001, 'regular', 'Ethan', 'chenwenbin1017', 'Master')"
    //     var sqlEditCommand = "UPDATE registered_users SET user_name='yo', user_password='niggar' WHERE user_id='6666'"
    //     var sqlDeleteCommand = "DELETE FROM registered_users WHERE user_id=001"
    //     connection.query(sqlDeleteCommand, function (err, rows) {
    //         if (err) {
    //             console.log('err')
    //         }
    //         console.log(rows)
    //     })
    // }
    //
    // getAllUsers()

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



    // var interval = {
    //     limit: 5,
    //     offset: 1
    // }
    //
    // var result = []


   //  P.getPokemonsList(interval)
   //     .then(function (response) {
   //      //  result.push(response.name)
   //      console.log(response)
   // })

   // console.log(result)
    //
    // P.getPokemonByName(2)
    //     .then(function (response) {
    //         // console.log(response)
    //         //name
    //         // result[0] = response.name
    //         console.log(response)
    //     })
    // P.getCharacteristicById(2)
    //   .then(function(response) {
    //     console.log(response);
    //   })

        // P.getPokemonByName('eevee').then(function (response) {
        //      console.log(response);
        //    })
        //    .catch(function(error) {
        //      console.log('There was an ERROR: ', error);
        //   });

    // require('databaseScripts.server.js')(app, db)
    //     app.post('/database', function (req, res) {
    //         var name = req.body['name']
    //         var sql = "CALL starwarsFINAL.track_character(" + "'" + name + "'" + ")"
    //         connection.query(sql, function (err, rows) {
    //             if (err) {
    //                 res.sendStatus(404)
    //             }
    //             res.json(rows)
    //         })
    //     })
    //
    //     app.get('/api/database', function (req, res) {
    //         connection.end()
    //         res.sendStatus(200)
    //     })
    // })

    // P.getPokemonByName('eevee').then(function (response) {
    //      console.log(response);
    //    })
    //    .catch(function(error) {
    //      console.log('There was an ERROR: ', error);
    //   });

    // var icon = PkSpr.decorate({slug: "pikachu"}); // see docs for more attributes
    // console.log(icon);
}
