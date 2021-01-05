import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({id, content, votes, vote}) => {

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

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.voteAnecdote(id)
    props.setNotification(content, 50000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => <Anecdote key={anecdote.id} id={anecdote.id} content={anecdote.content} votes={anecdote.votes} vote={() => vote(anecdote.id, anecdote.content)}/>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === '' ) {
    return {
      anecdotes: state.anecdotes
    }
  }
  else {
    return {
      anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  }
}

const mapDispatchToProps = {
  voteAnecdote, setNotification
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedList