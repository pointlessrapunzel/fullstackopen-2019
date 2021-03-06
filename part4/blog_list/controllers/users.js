const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// get all users
usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  res.json(users.map(u => u.toJSON()))
})

// save a user
usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.password || body.password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 chars' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter