var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var db = require('mysql')
var app = express()
var Pokedex = require('pokedex-promise-v2')
var P = new Pokedex()

app.use(bodyParser.urlencoded({extended: true}))

app.listen(process.env.PORT || 8080, function () {
    console.log('listen to port 8080')
})

app.get('/', function (req, res) {
    P.getPokemonByName('eevee').then(function (response) {
         console.log(response);
       })
       .catch(function(error) {
         console.log('There was an ERROR: ', error);
      });
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/quotes', function (req, res) {
    path.join()
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/quotes', function (req, res) {
    console.log(req.body)

})

app.use(express.static('public'))

var connection
if (process.env.JAWSDB_MARIA_URL) {
    connection = db.createConnection(process.env.JAWSDB_MARIA_URL)
} else {
    //local connection
    connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'chenwenbin1017'
    })
}

connection.connect()
