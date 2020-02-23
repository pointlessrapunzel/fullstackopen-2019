import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      console.error('wrong credentials')
    }
  }

  return (
    <div>
      <h1>log in to application</h1>
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