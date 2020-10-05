import React from 'react'
import CountryInfo from './CountryInfo.js'

const Countries = ({filter, countries}) =>{
	const filterCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

	if(filterCountries.length > 10){ 
		return(<div>Too many matches, specify another filter.</div>)
	}
	else if(filterCountries.length === 1){
		return (<CountryInfo country={filterCountries[0]}/>)
	}
	else if(filterCountries.length > 1 || filterCountries.length <= 10){
		return(
			filterCountries.map(country =>{ return(<p key={country.name}>{country.name}</p>)})
		)
	}
}

export default Countries