const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app