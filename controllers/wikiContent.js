const express = require('express')
const router = express.Router()
const Character = require('../models/Character')
const Episode = require('../models/Episode')
const Location = require('../models/Location')
const ConspiracyTheory = require('../models/ConspiracyTheory')
const User = require('../models/User')
const { createUserToken, requireToken } = require('../middleware/auth')

require('dotenv').config()

router.get('/theories', (req, res) => {
    ConspiracyTheory.find({})
        .then(theoryData => res.send(theoryData)
        )
})

router.post('/theories', (req, res) => {
    console.log(req.body)
    ConspiracyTheory.create({
        author: req.body.author,
        body: req.body.theory,
        theorist: req.body.theorist
    })
        .then(theory => {
            User.findById(theory.author)
                .then(person => {
                    console.log('1111', person)
                    person.conspiracyTheories.push(theory._id)
                    person.save()
                })
        })
})

router.post('/comments', (req, res) => {
    ConspiracyTheory.findById(req.body.theoryId)
        .then(theory => {
            theory.comments.push({
                author: req.body.author,
                body: req.body.comment,
                userName: req.body.commenter
            })
            theory.save()
        })
})

router.get('/characters', (req, res) => {
    Character.find({})
        .then(characterData => res.send(characterData)
        )
})

router.get('/episodes', (req, res) => {
    Episode.find({})
        .then(episodeData => res.send(episodeData)
        )
})

router.get('/locations', (req, res) => {
    Location.find({})
        .then(locationData => res.send(locationData)
        )
})

module.exports = router