import React, { useState, useEffect } from 'react';
import blogService from './services/blogs'

import AddBlogForm from './components/AddBlogForm'
import Login from './components/Login'
import Blog from './components/Blog'

function App() {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  
  useEffect(() => {
    blogService
      .getAll()
      .then(result => {
        setBlogs(result)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (!user) {
    return (
      <Login setUser={setUser} />
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async e => {
    e.preventDefault()
    console.log('adding blog')
    const [ title, author, url ] = [ 
      e.target[0].value, 
      e.target[1].value, 
      e.target[2].value
    ]

    const blog = {
      title, author, url
    }

    try {
      console.log(blog)
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
    } catch (exception) {
      console.error('ERROR ADDING THE BLOG')
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <div>
        {user.name} logged in
        <button 
          type="button"
          onClick={logOut}
        >log out</button> 
      </div>
      <br />
      <AddBlogForm submit={addBlog} />
      <br />
      <div>
        {
          blogs.map(blog => <Blog key={blog.id} blog={blog} />)
        }
      </div>
    </div>
  )
}

export default App;