import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
