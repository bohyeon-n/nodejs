var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// DATABASE SETTING
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'TESTDB'
})

connection.connect()

// Router!!
router.get('/', function(req, res) {
  let msg
  console.log(req.flash('error'))
  let errMsg = req.flash('error')
  if (errMsg) msg = errMsg
  res.render('login.ejs', { message: msg })
})

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, id)
})
passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      console.log('local-join!')
      const query = connection.query(
        `select * from testtable where email = "${email}"`,
        function(err, rows) {
          if (err) return done(err)
          if (rows.length) {
            console.log('existed user')
            return done(null, false, { message: 'your email is alredy used!' })
          } else {
            console.log(rows)
            const sql = { password: password, email: email }
            const query = connection.query(
              'insert into testtable set ?',
              sql,
              function(err, rows) {
                if (err) throw err
                return done(null, { email: email, id: rows.insertId })
              }
            )
          }
        }
      )
    }
  )
)

router.post(
  '/',
  passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
  })
)

module.exports = router
