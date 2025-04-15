import { useState } from 'react'
import './App.css'
import WeatherForm from './components/WeatherForm'
import DisplayWeather from './components/DisplayWeather'

type WeatherData = {
  name: string
  main: {
    temp: number
    humidity: number
    pressure: number
  }
  weather: {
    description: string
    icon: string
  }[]
  wind: {
    speed: number
  }
}

function App() {
  const [zip, setZip] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial')

  const fetchWeather = async (zipCode: string, unit: 'imperial' | 'metric') => {
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=${unit}`
      )
      const data = await response.json()

      if (data.cod === 200) {
        setWeather(data)
      } else {
        setError(data.message)
      }
    } catch {
      setError('Failed to fetch weather data.')
    } finally {
      setLoading(false)
    }
  }

  const toggleUnits = () => {
    const newUnits = units === 'imperial' ? 'metric' : 'imperial'
    setUnits(newUnits)
    
    // Refetch weather data with the new units
    if (zip) {
      fetchWeather(zip, newUnits)
    }
  }

  const getGeoWeather = () => {
    if (navigator.geolocation) {
      setLoading(true)
      setError('')
      setWeather(null)

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
            )
            const data = await response.json()

            if (data.cod === 200) {
              setWeather(data)
            } else {
              setError(data.message)
            }
          } catch {
            setError('Failed to fetch weather data.')
          } finally {
            setLoading(false)
          }
        },
        () => {
          setError('Failed to get geolocation.')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div className="App">
      <h1>🌤️ React Weather App</h1>
      <WeatherForm
        zip={zip}
        setZip={setZip}
        onSubmit={() => fetchWeather(zip, units)}
        units={units}
        toggleUnits={toggleUnits}
      />
      <button onClick={getGeoWeather}>Use My Location</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && <DisplayWeather weather={weather} units={units} />}
    </div>
  )
}

export default App
