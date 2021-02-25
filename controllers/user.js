const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { createUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport')
<<<<<<< HEAD
const Character = require('../models/Character')
=======
>>>>>>> a27ddcb6b66118a04e5b4b8488b619d25a2f87af

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(foundUser => createUserToken(req, foundUser))
    .then(token => res.json({ token }))
    .catch(err => console.log('Error Logging In: ', err))
})
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => ({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      dimension: req.body.dimension,
      rickOrMorty: req.body.rickOrMorty
    }))
    .then(hashedUser => User.create(hashedUser))
    .then(createdUser => createUserToken(req, createdUser))
    .then(token => res.status(201).json({ token }))
    .catch(err => console.log(`Error creating User ${err}`))
})

router.put('/update', (req, res) => {
  console.log('1111', req.body)
  User.findByIdAndUpdate(req.body.id, {email: req.body.email, userName: req.body.userName, dimension: req.body.dimension, rickOrMorty: req.body.rickOrMorty })
  .then(updatedUser => {
    res.status(200)
    res.send('/profile')
  })
  .catch(err => {
    console.log(err)
  })
})

<<<<<<< HEAD
router.delete('/profile:id', (req, res) => {
  console.log(req.params)
  User.findByIdAndRemove(req.body.id)
=======
router.post('/profile', (req, res) => {
  console.log('Blue', req.body.id)
  User.findByIdAndRemove(req.body.id)
  .then(deletedUser => {
    console.log(deletedUser)
    res.status(200)
    res.send('/signup')
  })
>>>>>>> a27ddcb6b66118a04e5b4b8488b619d25a2f87af
})

// Example of how to protect a route with 
// PRIVATE
// GET /api/private
router.get('/private', requireToken, (req, res) => {
  console.log(req.user)
  return res.json({ 'message': 'thou hath been granted permission to access this route.' })
})


// test route below:
// router.get('/random', (req, res) => {
//   console.log(req.user)
//   return res.json({'message': 'thou hath been granted permission to access this route.'})
// })

module.exports = router