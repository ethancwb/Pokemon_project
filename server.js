var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var db = require('mysql')
var app = express()
var Pokedex = require('pokedex-promise-v2')
var P = new Pokedex()
process.env.UV_THREADPOOL_SIZE = 128;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(process.env.PORT || 8080, function () {
})

app.use(express.static('public'))

// var connection
// if (process.env.JAWSDB_MARIA_URL) {
//     connection = db.createConnection(process.env.JAWSDB_MARIA_URL)
// } else {
//     //local connection
//     // connection = db.createConnection({
//     //     host: 'localhost',
//     //     user: 'root',
//     //     password: 'phfandzjx',
//     //     database: 'pokemon_fight'
//     // })
// }

var connection = db.createConnection("mysql://m56vff77rb877g2t:cby2rja1vlopxflt@thzz882efnak0xod.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/m4wf5ifdowrsox28")

connection.connect()

require('./public/app.js')(app, connection, P)
