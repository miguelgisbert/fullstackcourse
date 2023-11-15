import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Countries = ({filteredCountries, singleCountry, setSearchString}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        if (singleCountry) {
          axios
            .get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${singleCountry[0].capital}`)
            .then(response => {
              setWeather(response.data)
              console.log(response.data)
            })
        }
    }, [singleCountry, api_key])

    return ( 
        singleCountry !== null ? (
            <>
            <h1>{singleCountry[0].name.common}</h1>
            <p>{singleCountry[0].capital}</p>
            <p>population {singleCountry[0].population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(singleCountry[0].languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={singleCountry[0].flags.svg} alt={singleCountry[0].name.common} style={{maxHeight: '100px'}} />
            {weather && <p>Temperature: {weather}</p>}
            </>
        ):
        typeof filteredCountries === 'string' ? (
          <p>{filteredCountries}</p>
        ) : (
        filteredCountries.map(country => (            
            <p key={country.name.common}>{country.name.common}<button onClick={()=>{setSearchString(country.name.common)}} style={{margin: "10px 5px"}}>Show</button></p> 
        ))
        )
    )
}

export default Countries