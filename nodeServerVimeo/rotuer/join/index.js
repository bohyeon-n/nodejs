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
router.get('/', function(req, res) {
  console.log('get join url')
  res.sendFile(path.join(__dirname, '../../public/join.html'))
})

router.post('/', function(req, res) {
  const body = req.body
  const email = body.email
  const name = body.name
  const password = body.password
  const query = connection.query(
    `insert into testtable (email, name, password) values('${email}', '${name}', '${password}')`,
    function(err, rows) {
      if (err) {
        throw err
      }
      console.log('ok db insert')
    }
  )
})

module.exports = router
