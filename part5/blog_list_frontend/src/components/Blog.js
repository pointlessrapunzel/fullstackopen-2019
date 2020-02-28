import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [shown, setShown] = useState(false)

  const handleShown = () => setShown(!shown)

  const user = blog.user ? blog.user.username : 'added with React'

  if (!shown) {
    return (
      <div className='blog'>
        <span className='blog-title' onClick={handleShown}>
          {blog.title} {blog.author}
        </span>
      </div>
    )
  } else {
    return (
      <div className='blog'>
        <span className='blog-title' onClick={handleShown}>
          {blog.title} {blog.author}
        </span>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button type='button'>like</button>
        </div>
        <div>added by {user}</div>
      </div>
    )
  }
}

export default Blog