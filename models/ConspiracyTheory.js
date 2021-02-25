const mongoose = require('../db/connection')

const commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  body: String
})

const conspiracyTheorySchema = new mongoose.Schema({
  author: String, 
  body: String,
  comments: [commentSchema]
})

const ConspiracyTheory = mongoose.model('ConspiracyTheory', conspiracyTheorySchema)
module.exports = ConspiracyTheory