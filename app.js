const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(process.env.PORT)
