const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
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
blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  })

  try {
    const result = await blog.save()
    res.status(201).json(result)
  } catch(error) {
    next(error)
  }
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