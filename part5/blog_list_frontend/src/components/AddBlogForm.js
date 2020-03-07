import React, { useState } from 'react'

const Input = ({ name, value, setValue }) => (
  <div>
    <label>{name}:
      <input
        type="text"
        name={name}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </label>
  </div>
)

const AddBlogForm = ({ submit }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  // cleans up the state in this component, before adding the blog
  const submitHere = e => {
    setTitle('')
    setAuthor('')
    setUrl('')
    submit(e)
  }

  return (
    <form onSubmit={submitHere}>
      <Input name="title" value={title} setValue={setTitle} />
      <Input name="author" value={author} setValue={setAuthor} />
      <Input name="url" value={url} setValue={setUrl} />
      <input type="submit" value="create" />
    </form>
  )
}

export default AddBlogForm