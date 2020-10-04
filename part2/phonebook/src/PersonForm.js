import React from 'react'

const PersonForm = ({submitAction, nameInput, nameHandler, numberInput, numberHandler}) =>{
  return(
    <form onSubmit={submitAction}>
        <h1>add a new...</h1>
        <div>
          name: <input value={nameInput} onChange={nameHandler}/>
        </div>
        <div>
          number: <input value={numberInput} onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm