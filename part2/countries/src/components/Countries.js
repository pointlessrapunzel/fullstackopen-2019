import React, { useState } from 'react'

const Country = ({ country }) => (
  <div style={{margin: 5, backgroundColor: '#f9f3f3', padding: 5}}>
    <h2>{country.name}</h2>
    <span>capital {country.capital}</span>
    <br />
    <span>population {country.population}</span>
    <h3>Languages</h3>
    <ul>
      {country.languages.map(lang => 
        <li key={lang.iso639_1}>{lang.name}</li>
      )}
    </ul>
    <img src={country.flag} width="150px" alt={`${country.name} flag`} />
  </div>
)

const ListOfCountries = ({countries}) => {
  const [ shownCountries, setShownCountries ] = useState([])

  const displayStyle = {
    display: 'flex',
    backgroundColor: '#f9f3f3',
    flexWrap: 'wrap',
  }

  const toggleShown = country => () => {
    if (shownCountries.includes(country)) {
      // country is already shown, remove from shown
      setShownCountries(shownCountries.filter(c => c !== country))
    } else {
      // make country shown
      setShownCountries(shownCountries.concat(country))
    }
  }
  console.log(shownCountries)

  return (
    <div>
      <ul style={{listStyle: 'none'}}>
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

const Countries = ({ query, countries }) => {
  const areSame = (str1, str2) => (
    str1.toLowerCase() === str2.toLowerCase()
  )
  
  const filtered = countries.filter(country =>
    country.name.toLowerCase()
      .includes(query.toLowerCase())
  )

  if (!query) return <p>Type in a name of a country</p>
  else if (filtered.length > 10) return <p>Too many matches, specify another filter</p>
  else if (filtered.length > 1) {
    // find whether countries has a unique country fitting the query
    let uniqueCountry = filtered.find(country => areSame(country.name, query))

    return uniqueCountry ? <Country country={uniqueCountry} />
          : <ListOfCountries countries={filtered} />
  }
  else if (filtered.length === 1) return <Country country={filtered[0]} />
  else return <p>No county found</p>
}

export default Countries