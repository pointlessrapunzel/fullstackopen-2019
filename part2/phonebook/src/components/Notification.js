import React from 'react'

const Notification = ({message, type}) => {
  if (message === null) return null

  const style = {
    fontSize: 20,
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (type === 'success') style.color = 'green'
  if (type === 'danger') style.color = 'red'
  if (type === 'warning') style.color = '#FF5522'

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification