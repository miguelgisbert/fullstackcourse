import React from 'react'

const Persons = ({persons, searchString}) => {

    const showAll = () => true;

    const filterFn = searchString 
        ? person => person.name.toLowerCase().includes(searchString)  
        : showAll;

    return (
        <>
        <h2>Numbers</h2>
        {persons.filter(filterFn).map(person => (
            <p key={person.key}>{person.name} {person.number}</p>
        )
        )}
        </>
    )
}

export default Persons