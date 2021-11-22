const path = require('path')

const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.get('/', function (request, response) {
  response.render('shared/layout', { title: 'Home' })
})
app.get('/SpaceStation', function (request, response) {
  response.render('pages/spaceStation', { title: 'Space Station' })
})
app.get('/Planet', function (request, response) {
  response.render('pages/Planet', { title: 'Planet' })
})
app.get('/Cargo', function (request, response) {
  response.render('pages/Cargo', { title: 'Cargo' })
})
app.listen(process.env.PORT || 8080)
