import React from 'react'
import CountryItem from './CountryItem'
import CountryInfo from './CountryInfo'

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
			filterCountries.map(country =>{
				return(<CountryItem key={country.name} country={country}/>)
			})
		)
	}
}

export default Countries