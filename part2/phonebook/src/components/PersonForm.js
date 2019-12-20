import React from 'react'

const PersonForm = (props) => {
  const { onSubmit, inputAttributes } = props
  const [ newName, handleNameChange, 
        newNumber, handleNumberChange ] = inputAttributes

  return (
  <form onSubmit={onSubmit}>
    <div>
      name: <input 
              type="text"
              value={newName}
              onChange={handleNameChange}  
            />
    </div>
    <div>
      number: <input
                type="text"
                value={newNumber}
                onChange={handleNumberChange}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm