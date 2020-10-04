import React from 'react';

const Numbers = ({filter, persons}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {persons.map(person =>{
          if(person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter)){
            return(<p key={person.name}>{person.name} {person.number}</p>)
          }
        })
      }
    </div>
  )
}

export default Numbers