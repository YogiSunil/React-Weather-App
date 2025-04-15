import React from 'react'

type WeatherFormProps = {
  zip: string
  setZip: React.Dispatch<React.SetStateAction<string>>
  onSubmit: () => void
  units: 'imperial' | 'metric'
  toggleUnits: () => void
}

const WeatherForm = ({
  zip,
  setZip,
  onSubmit,
  units,
  toggleUnits,
}: WeatherFormProps) => {
  return (
    <div>
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="Enter Zip Code"
      />
      <button onClick={onSubmit}>Get Weather</button>
      <div>
        <button onClick={toggleUnits}>
          {units === 'imperial' ? 'Switch to Celsius' : 'Switch to Fahrenheit'}
        </button>
      </div>
    </div>
  )
}

export default WeatherForm
