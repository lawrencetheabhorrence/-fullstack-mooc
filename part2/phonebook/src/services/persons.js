import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () =>{
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (newObject) =>{
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const updateObject = (id, newObject) =>{
	return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteObject = (id) =>{
	axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, updateObject, deleteObject}