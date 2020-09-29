import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Score = ({name, score}) =>{
	return (<><p>{name} {score}</p></>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>setGood(good + 1)}>good</button>
      <button onClick={()=>setNeutral(neutral + 1)}>neutral</button>
      <button onClick={()=>setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Score name="good" score={good}/>
      <Score name="neutral" score={neutral}/>
      <Score name="bad" score={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
