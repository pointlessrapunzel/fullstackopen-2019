import React, { useState } from 'react'
import Country from './Country'

const ListOfCountries = ({countries}) => {
  const [ shownCountries, setShownCountries ] = useState([])

  const displayStyle = {
    display: 'flex',
    backgroundColor: '#f9f3f3',
    flexWrap: 'wrap',
  }

  const ulStyle = {listStyle: 'none', padding: 0}

  const toggleShown = country => () => {
    if (shownCountries.includes(country)) {
      // country is already shown, remove from shown
      setShownCountries(shownCountries.filter(c => c !== country))
    } else {
      // make country shown
      setShownCountries(shownCountries.concat(country))
    }
  }

  return (
    <div>
      <ul style={ulStyle}>
      {countries.map(country => {
        return (
          <li key={country.alpha3Code}>
            {country.name}
            <button 
              type="button"
              onClick={toggleShown(country.name)}
            >{shownCountries.includes(country.name) ? 'hide' : 'show'}
            </button>
          </li>
        )
      })}
      </ul>
      <div style={displayStyle}>
        {countries.filter(country => {
          return shownCountries.find(c => 
            country.name === c)
        }).map(country => 
          <Country 
            key={country.alpha3Code} 
            country={country} 
          />)}
      </div>
    </div>
  )
}

export default ListOfCountries