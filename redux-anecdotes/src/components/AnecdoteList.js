import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({id, content, votes}) => {
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch({ type: 'VOTE', data: { id } })
  }

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  return (
    <div>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} id={anecdote.id} content={anecdote.content} votes={anecdote.votes} />)}
    </div>
  )
}

export default AnecdoteList