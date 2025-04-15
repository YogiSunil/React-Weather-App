import React from 'react'
import './DisplayWeather.css'

type WeatherProps = {
  weather: {
    main: {
      temp: number
      humidity: number
      pressure: number
    }
    weather: { description: string; icon: string }[]
    wind: {
      speed: number
    }
    name: string
  }
  units: 'imperial' | 'metric'
}

const DisplayWeather: React.FC<WeatherProps> = ({ weather, units }) => {
  const temperature = weather.main.temp
  const description = weather.weather[0].description
  const icon = weather.weather[0].icon
  const windSpeed = weather.wind.speed
  const city = weather.name
  const humidity = weather.main.humidity

  // Convert temperature based on units
  const formattedTemp =
    units === 'imperial'
      ? (temperature * 9) / 5 + 32 // Convert Celsius to Fahrenheit
      : temperature // Keep temperature as Celsius

  // Determine background class based on weather condition
  const backgroundClass = description.includes('rain')
    ? 'rainy'
    : description.includes('clear')
    ? 'clear'
    : description.includes('cloud')
    ? 'cloudy'
    : 'default'

  return (
    <div className={`weather-container ${backgroundClass}`}>
      <h2>{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>{description}</p>
      <p>
        Temperature: {formattedTemp.toFixed(1)}°{units === 'imperial' ? 'F' : 'C'}
      </p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
    </div>
  )
}

export default DisplayWeather
