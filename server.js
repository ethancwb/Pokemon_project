var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var db = require('mysql')
var app = express()
var Pokedex = require('pokedex-promise-v2')
var P = new Pokedex()
process.env.UV_THREADPOOL_SIZE = 128;

app.use(bodyParser.urlencoded({extended: true}))

app.listen(process.env.PORT || 8080, function () {
    console.log('listen to port 8080')
})

app.use(express.static('public'))

// var connection
// if (process.env.JAWSDB_MARIA_URL) {
//     connection = db.createConnection(process.env.JAWSDB_MARIA_URL)
// } else {
//     //local connection
//     connection = db.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'chenwenbin1017',
//         database: 'pokemon_fight'
//     })
// }

var connection = db.createConnection("mysql://m56vff77rb877g2t:cby2rja1vlopxflt@thzz882efnak0xod.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/m4wf5ifdowrsox28")

connection.connect()

require('./public/app.js')(app, connection, P)

// app.get('/', function (req, res) {
//     P.getPokemonByName('eevee').then(function (response) {
//          console.log(response);
//        })
//        .catch(function(error) {
//          console.log('There was an ERROR: ', error);
//       });
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })

// var icon = PkSpr.decorate({slug: "pikachu"}); // see docs for more attributes
// console.log(icon);
