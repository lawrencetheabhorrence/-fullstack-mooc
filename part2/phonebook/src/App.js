import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import Numbers from './Numbers.js'
import Notification from './Notification.js'

const App = () => {
  const [ filter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (event) =>{
  	setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
  	event.preventDefault()
  	let newPerson = {name: newName, number: newNumber}
    const names = persons.map(person => person.name)
    if(!names.includes(newPerson.name)){
      personService
      .create(newPerson)
      .then(newPerson =>{
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })

      setNotification('Person added to phonebook')
      setTimeout(() =>{setNotification(null)}, 3000)
    }
  	else{
      if(window.confirm(`${newPerson.name} is in the phonebook. Update number?`)){
        const id = persons.find(person => person.name === newPerson.name).id
        personService
        .updateObject(id, newPerson)
        .then(() => {
          setPersons(persons.map(person => person.name !== newPerson.name ? person : newPerson))
          setNotification(`${newPerson.name}'s number has been updated`)
          setTimeout(() =>{setNotification(null)}, 3000)
        })
        .catch(error =>{
          setNotification(`${newPerson.name} is already deleted.`)
          setTimeout(() =>{setNotification(null)}, 3000)
        })

        setNewName('')
        setNewNumber('')
      }
    }

    setNewName('')
  }

  const deleteButton = id =>{
    if(window.confirm("Do you want to delete this person?")){
      personService.deleteObject(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <Notification message={notification}/>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange}/>
      <PersonForm submitAction={addPerson} nameInput={newName} nameHandler={handleNameChange} numberInput={newNumber} numberHandler={handleNumberChange}/>
      <Numbers filter={filter} persons={persons} deleteHandler={deleteButton}/>
    </div>
  )
}

export default App
