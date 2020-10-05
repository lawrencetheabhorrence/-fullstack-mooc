import React from 'react'

const CountryInfo = ({country}) =>{
	return(
		<div>
			<h1>{country.name}</h1>
			<ul>
				<li>capital: {country.capital}</li>
				<li>population: {country.population}</li>
			</ul>
			<h2>languages</h2>
			<ul>
				{country.languages.map(language => (<li key={language.name}>{language.name}</li>))}
			</ul>
			<img src={country.flag} alt ={"flag of " + country.name}/>
		</div>
	)
}

export default CountryInfo