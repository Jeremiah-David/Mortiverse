require('dotenv').config()
const passport = require('passport')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const options = {
  secretOrKey: process.env.JWT_SECRET,
  // How passport should find and extract the token from the request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const findUser = (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(foundUser => done(null, foundUser))
  .catch(err => done(err))
}

// Construct the strategy - The second argument (findUser) is how we 
// tell passport how to find the user in our database
const strategy = new Strategy(options, findUser)

// 'Register' the strategy so that passport uses it 
//  when we call the passport.authenticate() method
passport.use(strategy)

//Initialize the passport middleware based on the above configuration
passport.initialize()

// We will export this and use it in the login route
// to create a token each time a user logs in (or signs up)
const createUserToken = (req, user) => {
  // Turnery statement below:
  const validPassword = req.body.password ?
    bcrypt.compareSync(req.body.password, user.password) : false
    //One way to do it:
    // const validPassword
    // if(req.body.password){
    // validPassword = bcrypt.compareSync(req.body.password, userPassword)
    //} else {
    //  validPassword = false 
    // }
    // same as above:
    if(!user || !validPassword){
      const err = new Error('The provided email or password is incorrect')
      err.statusCode = 422
      throw err
    } else {
      const payload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        motto: user.motto,
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