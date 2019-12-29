import React from 'react'

const PersonForm = (props) => {
  const { onSubmit, inputAttributes } = props
  const [ newName, handleNameChange, 
        newNumber, handleNumberChange ] = inputAttributes

  return (
  <div>
    <h2>Add a new</h2>
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
  </div>
  )
}

export default PersonForm