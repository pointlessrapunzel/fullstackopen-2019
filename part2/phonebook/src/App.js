import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // filter shown numbers
  const filterPersons = () => (
  // if filter not empty, filter the array accordingly
    !newFilter ? persons :
      persons.filter(person => 
        person.name.toLowerCase()
          .includes(newFilter.trim().toLowerCase())) 
  )

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // add a new name to the list 
  const addPerson = (event) => {
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
      axios
        .post('http://localhost:3001/persons', personObj)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(personObj))
          setNewName('')
          setNewNumber('')
          }
        )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson}
        inputAttributes=
          {[newName, handleNameChange, newNumber, handleNumberChange]}
      />
      <h3>Numbers</h3>
      <Persons persons={filterPersons()} />
    </div>
  )
}

export default App