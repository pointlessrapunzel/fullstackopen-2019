import React from 'react'

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)

const Persons = ({ persons }) => (
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
          <Person key={person.id} person={person} />)
        }
      </tbody>
    </table>
  </div>
)

export default Persons