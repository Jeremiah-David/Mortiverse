const mongoose = require('../db/connection')

const options = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, userDocToReturn) => {
      delete userDocToReturn.password
      return userDocToReturn
    }
  }
}

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rickOrMorty: {
    type: String,
    required: true
  },
  dimension: {
    type: String,
  },
  conspiracyTheories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConspiracyTheory'
  }],
}, options)

const User = mongoose.model('User', userSchema)
module.exports = User