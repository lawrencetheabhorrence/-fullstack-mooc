import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryWeather = ({capital}) =>{
	const [weatherData, setWeatherData] = useState({location: {}, current: {}})

	useEffect(()=>{
		const api_key = process.env.REACT_APP_API_KEY
		const url =`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
		axios
		.get(url)
		.then(response =>{
			setWeatherData(response.data)
		})
	}, [capital])

	return(
		<div>
			<h1>Weather in {capital}</h1>
			<p><strong>temperature:</strong> {weatherData.current.temperature} degrees Celsius</p>
			<img src={weatherData.current.weather_icons} alt={weatherData.current.weather_descriptions} />
			<p><strong>wind:</strong> {weatherData.current.wind_speed} kph direction {weatherData.current.wind_dir}</p>
		</div>
	)
}

export default CountryWeather