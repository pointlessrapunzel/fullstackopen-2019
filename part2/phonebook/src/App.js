import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notifications from './components/Notifications'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const { Success } = Notifications
  const [ successMessage, setSuccessMessage] = useState(null)

  // asking the server for the list of persons
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  /*

    FILTERING THE LIST OF PERSONS

  */
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

  /*

    ADDING A NEW PERSON

  */
  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    const findPerson = (name) => {
      return persons.find(person => 
        person.name.toLowerCase() 
          === name.trim().toLowerCase()
      )
    }

    // form validation
    if (!newName || !newNumber) {
      alert("You have to enter a name and a number!")
    } else if (findPerson(newName)) {
      // person is already added, change the number
      if (
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        personService
          .update(findPerson(newName).id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(p => 
              p.id !== returnedPerson.id
              ? p
              : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      // add the new person
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  /*

    REMOVING A PERSON

  */
  const removePerson = id => () => {
   personService
    .remove(id)
    .then(() =>
      setPersons(persons.filter(p => p.id !== id))
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Success message={successMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <PersonForm onSubmit={addPerson}
        inputAttributes=
          {[newName, handleNameChange, newNumber, handleNumberChange]}
      />
      <Persons 
        persons={filterPersons()} 
        removePerson={removePerson}  
      />
    </div>
  )
}

export default App