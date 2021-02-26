const mongoose = require('../db/connection')

const options = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

const commentSchema = new.mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.userName,
    ref: 'User'
  }, 
  comment: {
    type: Text,
    required: true,
    minlength: 2,
    maxlength: 500
  }, 
  conspiracyTheory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConspiracyTheory'
  }
}, options)

module.exports = mongoose.model('Comment', commentSchema)