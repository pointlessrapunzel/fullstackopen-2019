import React from 'react'

const Person = ({ person, removePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button type="button" onClick={removePerson(person.id)}>
        delete
      </button>
    </td>
  </tr>
)

const Persons = ({ persons, removePerson }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(person => 
          <Person key={person.id} person={person} removePerson={removePerson}/>)
        }
      </tbody>
    </table>
  </div>
)

export default Persons