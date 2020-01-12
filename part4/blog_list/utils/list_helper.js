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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}