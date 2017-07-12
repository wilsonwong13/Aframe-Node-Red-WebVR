const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// var server = app.listen(process.env.PORT)

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/', function(req, res, next) {
  console.log('From server')
})

app.listen(3000, function() {
  console.log('Listening on port 3000')
})
