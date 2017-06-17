module.exports = function (app, connection, P) {

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

    function getAllName() {
        for (i = 102; i < 106; i++) {
            P.getPokemonByName(i)
                .then(function (response) {
                    var sqlAddCommand = "INSERT INTO pokemons(poke_id, poke_name, hp, attack, defense, sp_attack, sp_defense, speed, poke_type) VALUES (" +  response.id + "," + "'"
                    + response.name + "'" + "," + response.stats[0].base_stat + "," + response.stats[1].base_stat + "," + response.stats[2].base_stat + "," + response.stats[3].base_stat + "," + response.stats[4].base_stat
                    + "," + response.stats[5].base_stat + "," + "'" + response.types[0].type.name + "'" + ")"
                    connection.query(sqlAddCommand, function (err, rows) {
                        if (err) {
                            console.log('err')
                        }
                        console.log(rows)
                    })
                    // console.log(result[i])
                })
        }
    }

    getAllName()

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
