
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Section = ({header, text}) =>{
	return(
		<div>
			<h1>{header}</h1>
			<p>{text}</p>
		</div>
	)
}

const Button = ({handler, value}) => (<button onClick={handler}>{value}</button>)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [popularSelected, setPopularSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () =>{
  	let randomIndex = Math.floor(Math.random() * anecdotes.length)
  	setSelected(randomIndex)
  }

  const vote = () => {
  	let copy = [...points]
  	copy[selected] = copy[selected] + 1
  	mostVoted()
  	setPoints(copy)
  }

  const mostVoted = () => {
  	let copy = [...points]
  	let max = Math.max(...copy)
  	let maxIndex = copy.indexOf(max)
  	setPopularSelected(maxIndex)
  }

  return (
    <div>
    	<Section header="Anecdote of the Day" text={props.anecdotes[selected]}/>
    	<Button handler={()=>vote()} value="Vote"/>
    	<Button handler={()=>randomAnecdote()} value="Next Anecdote"/>
    	<Section header="Anecdote with Most Votes" text={props.anecdotes[popularSelected]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
