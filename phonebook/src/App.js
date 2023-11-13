import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} setSearchString={setSearchString} />
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Persons persons={persons} searchString={searchString} />
    </div>
  )
}

export default App
