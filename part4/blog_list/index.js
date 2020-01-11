const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')

const Blog = require('./models/blog')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

app.use(cors())
app.use(bodyParser.json())

// get all blogs
app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

// get a single blog
app.get('/api/blogs/:id', (req, res, next) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      res.json(blog)
    })
    .catch(error => next(error))
})

// save a new blog
app.post('/api/blogs', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

// delete a blog
app.delete('/api/blogs/:id', (req, res, next) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

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