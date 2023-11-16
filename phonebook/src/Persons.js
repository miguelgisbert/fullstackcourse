import React from 'react'

const Persons = ({persons, searchString, deletePerson}) => {

    const showAll = () => true;

    const filterFn = searchString 
        ? person => person.name.toLowerCase().includes(searchString)  
        : showAll;

    return (
        <>
        <h2>Numbers</h2>
        {persons.filter(filterFn).map(person => (
            <p key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person.id, person.name)} style={{ marginLeft:"10px" }}>Delete</button></p>
        )
        )}
        </>
    )
}

export default Persons