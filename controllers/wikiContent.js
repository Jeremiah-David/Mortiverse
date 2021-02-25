const express = require('express')
const router = express.Router()
const Character = require('../models/Character')
const Episode = require('../models/Episode')
const Location = require('../models/Location')
const ConspiracyTheory = require('../models/ConspiracyTheory')
const { createUserToken, requireToken } = require('../middleware/auth')

require('dotenv').config()

router.get('/theories', (req, res) => {
    ConspiracyTheory.find({})
    .then(theoryData => res.send(theoryData)
)})

router.post('/theories', (req, res) => {
    console.log(req.body)
    ConspiracyTheory.create({
        author: req.body.author,
        body: req.body.theory
    })
})

router.get('/characters', (req, res) => {
    Character.find({})
    .then(characterData => res.send(characterData)
)})

router.get('/episodes', (req, res) => {
    Episode.find({})
    .then(episodeData => res.send(episodeData)
)})

router.get('/locations', (req, res) => {
    Location.find({})
    .then(locationData => res.send(locationData)
)})

module.exports = router