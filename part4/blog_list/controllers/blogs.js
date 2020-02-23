const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
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
  if (!req.body.title || !req.body.url) {
    return res.status(400).json({
      error: 'title and url missing'
    })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user._id
    })

    let savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    savedBlog = await Blog
      .find({ title: savedBlog.title })
      .populate('user', { username: 1, name: 1 })
    res.status(201).json(savedBlog)
  } catch(error) {
    next(error)
  }
})

// update a blog
blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  if (!body.title || !body.author || !body.url) {
    return res.status(400).end()
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
  }

  try {
    const updatedBlog =
      await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

// delete a blog
blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    const blog = await Blog.findById(req.params.id)

    if (!blog) return res.status(404).json({
      error: 'does not exist'
    })

    if (decodedToken.id !== blog.user.toString()) {
      return res.status(401).json({ error: 'token is invalid' })
    }

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter