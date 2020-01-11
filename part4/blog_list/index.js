const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI, PORT } = require('./utils/config')

app.use('/api/blogs', blogsRouter)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

app.use(cors())
app.use(bodyParser.json())

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformed id' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})