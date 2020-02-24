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

const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObj, config)
  console.log(res)
  return res.data
}

export default { getAll, create, setToken }