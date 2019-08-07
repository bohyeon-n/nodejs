var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

// 라우터 처리를 여기서 할 수 있도록
router.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname, '../../public/main.html'))
  const id = req.user
  console.log(req.user)
  res.render('main.ejs', { id: id })
})
// 현재 경로에서 ../한 단계 위로 올라가서 public/main.html을 찾아ㄴ줘

// 여기 입장에서는  루트니까 이 파일로 리다이렉트 ?

// 모듈을 export 할 수 있다.
// 노드에서는 외부 라이브러리를 가져다가 export, require로 가져올 수 있다.

module.exports = router

// 라우터 모듈로 뺼 수 있다.
