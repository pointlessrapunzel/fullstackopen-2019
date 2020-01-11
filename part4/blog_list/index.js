require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObj) => {
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const PORT = process.env.PORT
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})

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