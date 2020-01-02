const express = require('express')
const routes = require('./routes/api')

// set up express app
const app = express()

// initialize routes
app.use('/api', routes)

// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests')
})

