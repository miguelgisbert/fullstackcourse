import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/person'

const App = () => {
  
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

  const addPerson = (e)=>{
    e.preventDefault()
    const person = persons.find(person => person.name === newName)
    if(person){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        const changedPerson = { ...person, name: newName, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
          .catch(error => {
            alert(
              `the person '${newName}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.id !== person.id))
          })
      }
    }
    else{
      const person = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} setSearchString={setSearchString} />
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Persons persons={persons} searchString={searchString} deletePerson={deletePerson} />
    </div>
  )
}

export default App
