import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'

import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Blog from './components/Blog'

function App() {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(
    { text: null, type: 'success',
      clear() {
        setMessage({ ...message, text: null })
      },
      createMessage(type, text) {
        setMessage({ ...message, type, text })
        setTimeout(message.clear, 4000)
      }
    })

  const blogFormRef = React.createRef()

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
      <div className="container">
        <header>
          <h1>log in to application</h1>
          <Notification message={message} />
        </header>
        <Login setUser={setUser} notif={{ message, setMessage }} />
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async e => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    const [ title, author, url ] = [
      e.target[0].value,
      e.target[1].value,
      e.target[2].value
    ]

    const blog = {
      title, author, url
    }

    try {
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
      message.createMessage(
        'success',
        `a new blog ${savedBlog[0].title} by ${savedBlog[0].author} added`
      )
    } catch (exception) {
      console.error(exception)
      message.createMessage('error', 'Error adding the blog')
    }
  }

  const renderBlogs = () => (
    blogs
      .sort((b1, b2) => b1.likes < b2.likes ? 1 : -1)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
          handleLike={() => handleLikeOf(blog)}
          handleDeletion={() => handleDeletionOf(blog)}
        />))
  )

  const handleLikeOf = async blog => {
    const res = await blogService.giveLike(blog)
    // server only sends back user id, without username and name,
    // which causes problems in Blog component.
    // user is copied from the liked blog, and not from server response.
    // server doesn't have to make 2 requests to db to populate user
    setBlogs(blogs.map(b => b.id !== blog.id ? b : { ...res, user: b.user }))
  }

  const handleDeletionOf = async blog => {
    if (!window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) return
    try {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      message.createMessage('warning', `Successfully deleted ${blog.title} by ${blog.author}`)
    } catch(exception) {
      console.error(exception)
      message.createMessage('error', 'Error deleting the blog')
    }
  }

  return (
    <div className='container'>
      <header>
        <h1>blogs</h1>
        <Notification message={message} />
      </header>
      <div>
        {user.name} logged in
        <button
          type='button'
          onClick={logOut}
        >log out</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <AddBlogForm submit={addBlog} />
      </Togglable>
      <div>
        {renderBlogs()}
      </div>
    </div>
  )
}

export default App