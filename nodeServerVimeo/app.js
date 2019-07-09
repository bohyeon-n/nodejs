var express = require('express')
var app = express()
const bodyParser = require('body-parser')

var main = require('./rotuer/main')
var email = require('./rotuer/email.js')

app.listen(3000, function() {
  console.log('start!! express server on port 3000')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/main.html')
})

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/main', main)
app.use('/email', email)
