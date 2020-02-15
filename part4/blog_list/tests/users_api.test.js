const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  describe('creation', () => {
    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.getUsersFromDb()

      const newUser = {
        username: 'pointless',
        name: 'Valto Amelia',
        password: 'supercool'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.getUsersFromDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('fails with proper statuscode and message if username taken', async () => {
      const usersAtStart = await helper.getUsersFromDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'hehehe'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.getUsersFromDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails with proper statuscode and message if username is less than minlength', async () => {
      const usersAtStart = await helper.getUsersFromDb()

      const newUser = {
        username: 'sh',
        name: 'short name',
        password: 'okpass'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('`username` (`sh`) is shorter')

      const usersAtEnd = await helper.getUsersFromDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails with proper statuscode and message if password is less than minlength', async () => {
      const usersAtStart = await helper.getUsersFromDb()

      const newUser = {
        username: 'short pass',
        name: 'short pass',
        password: 'ok'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('at least 3 chars')

      const usersAtEnd = await helper.getUsersFromDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
})