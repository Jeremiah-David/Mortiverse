const mongoose = require('../db/connection')

// it's conspiracy time

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
  body: String,
  userName: String
})

const conspiracyTheorySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
  body: String,
  comments: [commentSchema],
  theorist: String
})

const ConspiracyTheory = mongoose.model('ConspiracyTheory', conspiracyTheorySchema)
module.exports = ConspiracyTheory