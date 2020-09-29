import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Score = ({name, score}) =>{
	return (<><p>{name} {score}</p></>)
}

const Statistics = ({good, neutral, bad, total, average, positive}) =>{
	return(
		<div>
			<Score name="good" score={good}/>
			<Score name="neutral" score={neutral}/>
			<Score name="bad" score={bad}/>
			<Score name="total" score={total}/>
			<Score name="average" score={average}/>
			<Score name="positive" score={positive + " %"}/>
	    </div>
	)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodButton = () =>{
  	setGood(good + 1)
  	setStatistics(good + 1, neutral, bad)
  }

  const handleNeutralButton = () =>{
  	setNeutral(neutral + 1)
  	setStatistics(good, neutral + 1, bad)
  }

  const handleBadButton = () =>{
  	setBad(bad + 1)
  	setStatistics(good, neutral, bad + 1)
  }

  const setStatistics = (goodparam, neutralparam, badparam) =>{
  	setTotal(goodparam + neutralparam + badparam)
  	setAverage((goodparam - badparam)/(total + 1))
  	setPositive((goodparam/(total + 1)) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>handleGoodButton()}>good</button>
      <button onClick={()=>handleNeutralButton()}>neutral</button>
      <button onClick={()=>handleBadButton()}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
