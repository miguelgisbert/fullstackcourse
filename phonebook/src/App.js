import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', key: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', key: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', key: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', key: 3 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

  const addPerson = (e)=>{
    e.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const person = {
        name: newName,
        number: newNumber,
        key: persons.length,
      }
      setPersons(persons.concat(person))
    }
  }

  const showAll = () => true;

  const filterFn = searchString 
      ? person => person.name.toLowerCase().includes(searchString)  
      : showAll;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={searchString} onChange={(e)=>setSearchString(e.target.value)}></input></div>
      <h2>add a new</h2>
      <form onSubmit={(e) => addPerson(e)}>
        <div>name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(filterFn).map(person => (
        <p key={person.key}>{person.name} {person.number}</p>
      )
      )}
    </div>
  )
}

export default App
