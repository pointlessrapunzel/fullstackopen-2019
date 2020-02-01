const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blog = new Blog({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  })

  await blog.save()
})

test('app returns the correct amount of blogs as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.length).toBe(1)
})

test('first blog is titled React patterns', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].title).toBe('React patterns')
})

test('unique identifier of blog posts is id, not _id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})