import React from 'react'

const Notification = ({ message }) => {
  if (!message.text) return null

  return (
    <div className={`message ${message.type}`}>
      <div className="message-text">{message.text}</div>
      <div className="icon-close" onClick={message.clear}></div>
    </div>
  )
}

export default Notification