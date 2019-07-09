var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// DATABASE SETTING
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'TESTDB'
})

connection.connect()

// Router!!
router.post('/form', function(req, res) {
  res.render('email.ejs', { email: req.body.email })
})

router.post('/ajax', function(req, res) {
  const email = req.body.email
  const responseData = {}
  const query = connection.query(
    `select name from testtable where email="${email}"`,
    function(err, rows) {
      if (err) throw err
      if (rows[0]) {
        responseData.result = 'ok'
        responseData.name = rows[0].name
      } else {
        console.log(`none:  ${rows[0]}`)
        responseData.result = 'none'
        responseData.name = ''
      }
      res.json(responseData)
    }
  )
})

module.exports = router
