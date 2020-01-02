import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const emptyNotification = {
    text: null,
    type: null
  }

  const [ notification, setNotification] = useState(emptyNotification)

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(emptyNotification)
    }, 5000)
  }

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
            setNotification({
              text: `${returnedPerson.name}'s number has been changed`,
              type: 'warning'
            })
            resetNotification()
            setPersons(persons.map(p => 
              p.id !== returnedPerson.id
              ? p
              : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setNotification({
              text: `Information of ${personObj.name} has already been removed from server`,
              type: 'danger'
            })
            setPersons(persons.filter(p => p.name !== personObj.name))
            resetNotification()
          })
      }
    } else {
      // add the new person
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({
            text: `Added ${returnedPerson.name}`,
            type: 'success'
          })
          resetNotification()
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
    .then(() => {
      let name = persons.find(p => p.id === id).name
      setNotification({
        text: `Information of ${name} has been deleted`,
        type: 'danger'
      })
      setPersons(persons.filter(p => p.id !== id))
      resetNotification()
    })
    .catch(() => {
      let name = persons.find(p => p.id === id).name
      setNotification({
        text: `Information of ${name} has already been removed from server`,
        type: 'danger'
      })
      setPersons(persons.filter(p => p.id !== id))
      resetNotification()
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={notification.text} 
        type={notification.type}
      />
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