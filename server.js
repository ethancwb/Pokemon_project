var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var db = require('mysql')
var app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, function () {
    console.log('listen to port 8080')
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/quotes', function (req, res) {
    path.join()
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/quotes', function (req, res) {
    console.log(req.body)
})

//local connection
var connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chenwenbin1017'
})

connection.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
})
