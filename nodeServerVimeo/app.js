var express = require('express')
var app = express()
const bodyParser = require('body-parser')
var router = require('./rotuer/index')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const flash = require('connect-flash')

app.listen(3000, function() {
  console.log('start!! express server on port 3000')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(router)
