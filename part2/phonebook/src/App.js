import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import Numbers from './Numbers.js'

const App = () => {
  const [ filter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
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
  	const newPerson = {name: newName, number: newNumber}
    const names = persons.map(person => person.name)
    if(!names.includes(newPerson.name)){
      setPersons(persons.concat(newPerson))
    }
  	else{ alert(newPerson.name + ' is already in the phonebook')}

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange}/>
      <PersonForm submitAction={addPerson} nameInput={newName} nameHandler={handleNameChange} numberInput={newNumber} numberHandler={handleNumberChange}/>
      <Numbers filter={filter} persons={persons}/>
    </div>
  )
}

export default App
