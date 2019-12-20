import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  // render the list of numbers

  const numberRows = () => {
    let personsArr = persons
    
    // if filter not empty, filter the array to be shown
    if (newFilter) personsArr = persons.filter(person => 
        person.name.toLowerCase()
          .includes(newFilter.trim().toLowerCase()))

    return (
      personsArr.map(person =>
        <tr key={person.name.trim()}>
          <td>{person.name}</td>
          <td>{person.number}</td>
        </tr>
      )
    )
  }

  // add a new name to the list
  const addNumber = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    // disallow adding an already existing name
    // .trim and lowercase are needed for successful check
    if (persons.find(person => 
          person.name.toLowerCase() === newName.trim().toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } 
    // if name or number fields are empty
    else if (!newName || !newNumber) {
      alert("You have to enter a name and a number!")
    } else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input type="text" value={newFilter} 
              onChange={handleFilterChange} 
            />
      <h2>Add a new</h2>
      <form onSubmit={addNumber}>
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
      <h2>Numbers</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {numberRows()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App