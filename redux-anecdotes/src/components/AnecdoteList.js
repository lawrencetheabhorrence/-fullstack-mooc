import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({id, content, votes}) => {
  const dispatch = useDispatch()
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(content, 10000))
  }

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => vote(id, content)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === ''){
      return anecdotes
    }
    else {
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
  })
  return (
    <div>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} id={anecdote.id} content={anecdote.content} votes={anecdote.votes} />)}
    </div>
  )
}

export default AnecdoteList