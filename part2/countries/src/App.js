import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ query, setFilter ] = useState('')

  // get data from restcountries.eu
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleQueryChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Data for countries!!!</h1>
      find countries:
      <input type='text' value={query} onChange={handleQueryChange} />
      <Countries query={query} countries={countries} />
    </div>
  );
}

export default App