import React from 'react'

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

const Countries = ({ query, countries }) => {
  const areSame = (str1, str2) => (
    str1.toLowerCase() === str2.toLowerCase()
  )
  
  const filtered = countries.filter(country =>
    country.name.toLowerCase()
      .includes(query.toLowerCase())
  )

  if (!query) return <p>Type in a name of a country</p>
  else if (filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filtered.length > 1) {
    // find whether countries has a unique country fitting the query
    let uniqueCountry = filtered.find(country => areSame(country.name, query))

    return uniqueCountry ? <Country country={uniqueCountry} />
          : filtered.map(country => 
              <li key={country.alpha3Code}>
                {country.name}
              </li>
            )
  } else if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  } else return <p>No county found</p>
}

export default Countries