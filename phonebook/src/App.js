import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      key: 0
    }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (e)=>{
    e.preventDefault()
    const person = {
      name: newName,
      key: persons.length,
    }
    setPersons(persons.concat(person))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => addPerson(e)}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.key}>{person.name} {person.key}</p>
      )
      )}
    </div>
  )
}

export default App
