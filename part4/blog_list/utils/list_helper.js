const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = blogs => {
  if (blogs.length < 1) return {}

  const mostLiked = blogs.reduce(
    (mostLikedBlog, currentBlog) => {
      return currentBlog.likes > mostLikedBlog.likes
        ? currentBlog
        : mostLikedBlog
    }, blogs[0])
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length < 1) return {}

  let blogCount = blogs.reduce((blogCount, blog) => {
    if (blog.author in blogCount) blogCount[blog.author]++
    else blogCount[blog.author] = 1
    return blogCount
  }, {})

  let mostBlogs = {
    author: null,
    blogs: 0
  }

  for (const author in blogCount) {
    if (blogCount[author] > mostBlogs.blogs) {
      mostBlogs.author = author
      mostBlogs.blogs = blogCount[author]
    }
  }

  return mostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}