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

  // counts how many blogs each author has and puts in an object
  // { author: blogCount, author2: blogCount }
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

const mostLikes = blogs => {
  if (blogs.length < 1) return {}

  // counts how many blogs each author has and puts in an object
  // { author: totalLikes, author2: totalLikes }
  let likeCount = blogs.reduce((likeCount, blog) => {
    if (blog.author in likeCount) likeCount[blog.author] += blog.likes
    else likeCount[blog.author] = blog.likes
    return likeCount
  }, {})

  let mostLikes = {
    author: null,
    likes: 0
  }

  for (const author in likeCount) {
    if (likeCount[author] > mostLikes.likes) {
      mostLikes.author = author
      mostLikes.likes = likeCount[author]
    }
  }

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}