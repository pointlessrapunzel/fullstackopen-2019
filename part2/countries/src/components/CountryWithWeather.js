import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

const CapitalWeather = ({capital}) => {
  const divStyle = {
    margin: 5, marginTop: -5, 
    backgroundColor: '#f9f3f3', padding: 5
  }

  const [weatherReport, setWeatherReport] = useState(null)
  // url to a weather API
  const baseUrl = 'https://api.weatherapi.com/v1/current.json'

  useEffect(() =>{
    axios
      .get(`${baseUrl}?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${capital}`)
      .then(response => {
        setWeatherReport(response.data)
        })
  }, [capital])

  if (!weatherReport) return <p>loading...</p>
  else {
    const {temp_c, condition, wind_kph, wind_dir} = weatherReport.current
    const city = weatherReport.location.name

    return (
    <div style={divStyle}>
      <h3>Weather in {city}</h3>
      <div><strong>temperature:</strong> {temp_c} Celsius</div>
      <div>
        <img src={condition.icon} alt={condition.text}/>
        <br />
        <span>{condition.text}</span>
      </div>
      <div><strong>wind:</strong> {wind_kph} kph direction {wind_dir}</div>
    </div>
  )}
}

const CountryWithWeather = ({country}) => {
  return (
    <div>
      <Country country={country} />
      <CapitalWeather capital={country.capital} />
    </div>
  )
}

export default CountryWithWeather