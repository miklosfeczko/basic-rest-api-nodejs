const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// set up express app
const app = express()

// connect to mongodb
mongoose.connect("mongodb://localhost/ninjago", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// serve this static file from the public folder
app.use(express.static('public'))

// middleware
// its going to parse the json data for us. Attach it to the request object so by the time
// it reaches our route handler it will have access to it
app.use(bodyParser.json())

// initialize routes
app.use('/api', routes)

// error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({ error: err.message })
})

// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests')
})

