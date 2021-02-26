require('dotenv').config()
const passport = require('passport')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const findUser = (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(foundUser => done(null, foundUser))
  .catch(err => done(err))
}

const strategy = new Strategy(options, findUser)

passport.use(strategy)

passport.initialize()

const createUserToken = (req, user) => {
  const validPassword = req.body.password ?
    bcrypt.compareSync(req.body.password, user.password) : false
    if(!user || !validPassword){
      const err = new Error('The provided email or password is incorrect')
      err.statusCode = 422
      throw err
    } else {
      const payload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        dimension: user.dimension,
        rickOrMorty: user.rickOrMorty,
        comments: user.comments,
        conspiracyTheories: user.conspiracyTheories
      }
      return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600})
    }
}

const requireToken = passport.authenticate('jwt', {session: false})

module.exports = { createUserToken, requireToken }