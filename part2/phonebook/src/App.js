import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas'}
  ])
  const [ newName, setNewName ] = useState('')

  const listNames = () => (
      persons.map(person => <li key="{person.name}">{person.name}</li>)
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName
    }

    setPersons(persons.concat(personObj))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) 
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}  
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {listNames()}
        </ul>
      </div>
    </div>
  )
}

export default App