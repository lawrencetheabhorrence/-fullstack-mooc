import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const modifyAnecdote = async (id, content) => {
  const response = await axios.put(`${baseUrl}/${id}`, content)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew, getAnecdote, modifyAnecdote }