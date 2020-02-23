import React, { useState, useEffect } from 'react';
import blogsService from './services/blogs'

import Login from './components/Login'
import Blog from './components/Blog'

function App() {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogsService
      .getAll()
      .then(result => {
        setBlogs(result)
      })
  }, [])

  if (!user) {
    return (
      <Login setUser={setUser} />
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <p>{user.name} logged in</p>
      <div>
        {
          blogs.map(blog => <Blog key={blog.id} blog={blog} />)
        }
      </div>
    </div>
  )
}

export default App;