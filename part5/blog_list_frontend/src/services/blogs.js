import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const giveLike = async blog => {
  const url = `${baseUrl}/${blog.id}`
  blog.likes++
  const res = await axios.put(url, blog)
  return res.data
}

const remove = async blog => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${blog.id}`
  const res = await axios.delete(url, config)
  return res
}

export default { getAll, create, giveLike, remove, setToken }