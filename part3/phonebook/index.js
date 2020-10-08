const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', function (req, res){return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => Math.floor(Math.random() * 100000000000000)

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Matthias",
      "number": "3208092840",
      "id": 5
    },
    {
      "name": "Grass",
      "number": "2342432423",
      "id": 6
    },
    {
      "name": "Haha",
      "number": "3453543",
      "id": 7
    }
]

app.get('/api/persons', (req, res) =>{
	res.json(persons)
})

app.get('/info', (req, res) =>{
	res.send(`
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>
	`)
})

app.get('/api/persons/:id', (req, res) =>{
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)

	res.json(person)
})

app.delete('/api/persons/:id', (req, res) =>{
	const id = Number(req.params.id)
	persons = persons.filter(p => p.id !== id)

	res.status(204).end()
})

app.post('/api/persons', (req, res) =>{
	const body = req.body

	const nullNameError = {
		"error" : "no name entered"
	}

	const notUniqueNameError = {
		"error" : "name must be unique"
	}

	if(!body.name){
		res.json(nullNameError).status(204)
	}

	else{
		const duplicate = persons.find(p => p.name === body.name)

		if(duplicate){
			res.json(notUniqueNameError).status(204)
		}

		else{
			const person = {
				"name" : body.name,
				"number" : body.number,
				"id": generateId()
			}
		
			persons = persons.concat(person)
		
			res.json(persons)
		}
	}
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)