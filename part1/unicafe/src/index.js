import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({name, value}) =>{
	return (<><tr><td>{name}</td><td>{value}</td></tr></>)
}

const Statistics = ({good, neutral, bad, total, average, positive}) =>{
	if(total === 0) return(<><p>No feedback given</p></>)

	return(
		<div>
			<table>
				<tbody>
					<Statistic name="good" value={good}/>
					<Statistic name="neutral" value={neutral}/>
					<Statistic name="bad" value={bad}/>
					<Statistic name="total" value={total}/>
					<Statistic name="average" value={average}/>
					<Statistic name="positive" value={positive + " %"}/>
				</tbody>
			</table>
	    </div>
	)
}

const Button = (props) =>(<button onClick={props.handleButton}>{props.value}</button>)

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
  	//since setStatistics accesses the 
  	//state variables before they have been modified
  	//so added 1 to reflect the button press
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
  	//same logic that is used for button handlers
  	//setStatistics is called only on a button press
  	//so total is incremented no matter  what
  	setAverage((goodparam - badparam)/(total + 1))
  	setPositive((goodparam/(total + 1)) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleButton={()=>(handleGoodButton())} value="good" />
      <Button handleButton={()=>(handleNeutralButton())} value="neutral" />
      <Button handleButton={()=>(handleBadButton())} value="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
