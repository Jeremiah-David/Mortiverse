require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({extended: false}))

app.use('/api', require('./controllers/user'))
app.use('/wiki', require('./controllers/wikiContent'))

app.listen(process.env.PORT || 8000, () => {
  console.log('Smooth JAZZ! V98-8000')
})