import React, { useState } from 'react'

const Blog = ({ blog, currentUser, handleLike, handleDeletion }) => {
  const [shown, setShown] = useState(false)

  const handleShown = () => setShown(!shown)

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
          <button type='button' onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.username}</div>
        {blog.user.username === currentUser.username
          ? <button onClick={handleDeletion}>remove</button>
          : null
        }
      </div>
    )
  }
}

export default Blog