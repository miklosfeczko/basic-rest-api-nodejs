const mongoose = require('mongoose')
const Schema = mongoose.Schema


// create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
})

// create ninja Schema & model
// we will define in our schema how our objects structure will look
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
})

// The Ninja model will represent the ninja collection
// mongoose will create a collection called: ninjas
// our model will be structured based on our schema
const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja