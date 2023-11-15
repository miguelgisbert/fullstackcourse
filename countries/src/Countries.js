import React from 'react'

const Countries = ({filteredCountries, singleCountry, setSearchString}) => {

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