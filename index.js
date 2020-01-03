const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')

// set up express app
const app = express()

// middleware
// its going to parse the json data for us. Attach it to the request object so by the time
// it reaches our route handler it will have access to it
app.use(bodyParser.json())

// initialize routes
app.use('/api', routes)

// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests')
})

