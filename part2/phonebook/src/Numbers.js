import React from 'react';

const PersonInfo = ({name, number, deleteHandler}) =>{
  return(<div>{name} {number} <button onClick={deleteHandler}>delete</button></div>)
}

const Numbers = ({filter, persons, deleteHandler}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {persons.map(person =>{
          if(person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter)){
            return(<PersonInfo key={person.id} name={person.name} number={person.number} deleteHandler={() => deleteHandler(person.id)} />)
          }
        })
      }
    </div>
  )
}

export default Numbers