import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Countries from './Countries'
import axios from 'axios'

const App = () => {
  
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')
  const [singleCountry, setSingleCountry] = useState(null)

  useEffect(() => {
    const results = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchString.toLowerCase())
    })
    if(results.length > 10) {
      setFilteredCountries('Too many countries, specify another filter')
    } 
    else {
      if(results.length === 1) {
        setSingleCountry(results)
      }
      else{
        setFilteredCountries(results) 
        setSingleCountry(null)
      }
    }
  }, [searchString, countries])
    
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages')
      .then(response => {
        setCountries(response.data)
        console.log("countries: ", response.data)
      })
    }, [])
    
  return (
    <div>
      <Filter searchString={searchString} setSearchString={setSearchString} />
      <Countries filteredCountries={filteredCountries} singleCountry={singleCountry} setSearchString={setSearchString} />
    </div>
  )
}

export default App
