import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/person'
import Success from './Success'
import Error from './Error'

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
  const [ successMessage, setSuccessMessage] = useState('')
  const [ errorMessage, setErrorMessage] = useState('')
  const successStyle = { color: 'green', fontWeight: 700, fontSize: 16, border: 'solid 2px green', margin: '20px 0', padding: '10px 20px', background: '#f5f5f5' }
  const errorStyle = { color: 'red', fontWeight: 700, fontSize: 16, border: 'solid 2px red', margin: '20px 0', padding: '10px 20px', background: '#f5f5f5' }

  useEffect(() => {
    console.log("success: ", successMessage)
  }, [successMessage])
  useEffect(() => {
    console.log("error: ", errorMessage)
  }, [errorMessage])

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
            setErrorMessage(`the person '${newName}' was already deleted from server`)
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
            setSuccessMessage(`Added ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
        .catch(error => {
          setErrorMessage(`The person '${newName}' could not be added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`The person '${name}' could not be deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <Success style={successStyle} message={successMessage} />}
      {errorMessage && <Error style={errorStyle} message={errorMessage} />}
      <Filter searchString={searchString} setSearchString={setSearchString} />
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Persons persons={persons} searchString={searchString} deletePerson={deletePerson} />
    </div>
  )
}

export default App
