import React from 'react'

const Success = ({message}) => {
  if (message === null) return null

  const style = {
    color: 'green',
    fontSize: 20,
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default { Success }