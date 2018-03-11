const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const api = require('./controller/api')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hey Mohanad!2');
})

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.get('/file/list', (req, res) => {
  const list_of_files = api.listFiles('tmp/', (response) => {
    res.send (response)
  })
})

console.log("Node Express Web server is listening on port 8081");
app.listen(process.env.PORT || 8081)
