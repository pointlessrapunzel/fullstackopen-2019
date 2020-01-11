const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all blogs
blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

// get a single blog
blogsRouter.get('/:id', (req, res, next) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      res.json(blog)
    })
    .catch(error => next(error))
})

// save a new blog
blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

// delete a blog
blogsRouter.delete('/:id', (req, res, next) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter