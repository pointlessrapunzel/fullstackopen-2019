import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog }) => {
  const [shown, setShown] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleShown = () => setShown(!shown)

  const user = blog.user ? blog.user.username : 'added with React'

  const handleLike = async () => {
    const res = await blogsService.giveLike(blog.id, blog)
    setLikes(res.likes)
  }

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
          {likes} likes
          <button type='button' onClick={handleLike}>like</button>
        </div>
        <div>added by {user}</div>
      </div>
    )
  }
}

export default Blog