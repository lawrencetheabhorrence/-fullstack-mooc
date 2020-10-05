import React, {useState} from 'react'
import CountryInfo from './CountryInfo.js'
import Button from './Button.js'

const CountryItem = ({country}) =>{
	const [show, setShow] = useState(false)

	const showHandler = () =>{
		setShow(!show)
	}

	if(show){
		return(<div key={country.name}>{country.name} <Button name="hide" handler={showHandler} /> <CountryInfo country={country}/></div>)
	}

	else{
		return(<div key={country.name}>{country.name} <Button name="show" handler={showHandler}/></div>)
	}
}

export default CountryItem