/* eslint-disable no-case-declarations */

export const initAnecdotes = (data) => {
  return { type: 'INIT_ANECDOTES', data }
}

export const createAnecdote = (data) => {
  return { type: 'NEW_ANECDOTE', data }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type){
  case 'VOTE':
    const id = action.data.id
    const anecdoteToChange = state.find(anecdote => anecdote.id === id)
    const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote).sort((a1, a2) => a2.votes - a1.votes)
  case 'NEW_ANECDOTE':
    return state.concat(action.data).sort((a1, a2) => a2.votes - a1.votes)
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state.sort((a1, a2) => a2.votes - a1.votes)
  }
}

export default anecdoteReducer