const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    await new Blog(blog).save()
  }
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

test('a POST request successfully creates a new blog post',
  async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogTitles = response.body.map(r => r.title)

    expect(response.body.length)
      .toBe(helper.initialBlogs.length + 1)
    expect(blogTitles).toContain('Go To Statement Considered Harmful')
  })

test('if the likes property of a posted blog is missing, defaults to 0',
  async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length - 1].likes).toBe(0)
  })

test('a posted blog with missing title and url props is rejected',
  async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

afterAll(() => {
  mongoose.connection.close()
})