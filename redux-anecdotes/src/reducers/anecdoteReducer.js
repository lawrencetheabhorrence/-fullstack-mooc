/* eslint-disable no-case-declarations */
import anecdoteService from '../services/anecdotes'

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE', data
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getAnecdote(id)
    await anecdoteService.modifyAnecdote(id, {...anecdoteToVote, votes: anecdoteToVote.votes + 1})
    dispatch({
      type: 'VOTE', data: { id }
    })
  }
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