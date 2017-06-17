module.exports = function (app, connection, P) {


    // used to import data
    // function getAllName() {
    //     for (i = 700; i < 722; i++) {
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
    //             })
    //     }
    // }
    // getAllName()
}
