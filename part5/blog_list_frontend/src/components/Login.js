import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'


const Login = ({ setUser, notif }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const { message, setMessage } = notif

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      setMessage({...message, type: 'error',
        text: 'wrong username or password'
      })
      message.autoClear()
      console.error('wrong credentials')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>username:
            <input 
              type="text" 
              name="username" 
              value={username} 
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>password:
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={({ target }) => setPassword(target.value)}  
            />
          </label>
        </div>
        <input type="submit" value="login" />
      </form>
    </div>
  )
}

export default Login