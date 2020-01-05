const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

// get a list of ninjas from the db
/* // to list all of the ninjas
router.get('/ninjas', function(req, res, next){
  Ninja.find({}).then(function(ninjas){
    res.send(ninjas)
  })
})
*/

router.get('/ninjas', function(req, res, next){
  Ninja.aggregate()
    .near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: 'dis'
    })
    .then(function(ninjas) {
        if (ninjas.length === 0)
        return res.send({
          message: 'max distance is too big or small'
        })
        res.send(ninjas)  
    }).catch(next)
})

// add new ninja to the db
router.post('/ninjas', function(req, res, next) {
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja)
  }).catch(next)
})

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(){
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    })
  }).catch(next)
})

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function(ninja){
    res.send(ninja)
  }).catch(next)
})

module.exports = router

