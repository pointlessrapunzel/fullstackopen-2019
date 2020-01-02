import React from 'react'

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

export default Country