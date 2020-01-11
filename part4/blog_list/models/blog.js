const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObj) => {
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)