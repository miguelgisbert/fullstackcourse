import React from 'react'

const Filter = ({searchString, setSearchString}) => {
    return (
        <div>filter shown with: <input value={searchString} onChange={(e)=>setSearchString(e.target.value)}></input></div>
    )
}

export default Filter