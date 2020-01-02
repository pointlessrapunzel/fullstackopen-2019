import React from 'react'
import CountryWithWeather from './CountryWithWeather'
import ListOfCountries from './ListOfCountries'

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

    return uniqueCountry ? 
          <CountryWithWeather country={uniqueCountry}/>
          : <ListOfCountries countries={filtered} />
  }
  else if (filtered.length === 1) return (
    <CountryWithWeather country={filtered[0]}/>
    ) 
  else return <p>No county found</p>
}

export default Countries