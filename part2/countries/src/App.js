import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter.js'
import Countries from './Countries.js'

const App = () =>{
	const [filter, setFilter] = useState('')
	const [countries, setCountries] = useState([])

	useEffect(() => {
	    axios
	      .get("https://restcountries.eu/rest/v2/all")
	      .then(response => {
	        setCountries(response.data)
	      })
  	}, [])

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	return(
		<div>
			<Filter filter={filter} handler={handleFilterChange} />
			<Countries filter={filter} countries={countries} />
		</div>
	)

}

export default App