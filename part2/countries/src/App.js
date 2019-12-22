import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => (
  <div>
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

const Display = ({ filter, countries }) => {
  // conditionally render a list of countries
  // or one county
  const filtered = countries.filter(
    country =>
      country.name.toLowerCase()
      .includes(filter.toLowerCase())
  )

  if (!filter) return <p>Type in a name of a country</p>
  else if (filtered.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if (filtered.length > 1)
    return filtered.map(country =>
      <li key={country.name}>{country.name}</li>
    )
  else if (filtered.length === 1)
    return <Country country={filtered[0]} />
  else return <p>No county found</p>
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  // get data from restcountries.eu
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Data for countries!!!</h1>
      find countries:
      <input type='text' value={filter} onChange={handleFilterChange} />
      <Display filter={filter} countries={countries} />
    </div>
  );
}

export default App;