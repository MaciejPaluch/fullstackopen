import { useState, useEffect } from "react"
import "./App.css"
const App = () => {
  const [countries, setCountries] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [filter , setFilter]= useState('')

  useEffect(() => {
      fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
          .then((res) => res.json())
          .then((json) => {
              setCountries(json)
              setDataIsLoaded(true)
          })
  }, []); 
  if (!dataIsLoaded) {
      return (
        <div>
          <h1>Please wait some time....</h1>
        </div>
      );
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  let countriesToShow= countries.filter(country => (country.name.common.includes(filter)))
  return (
      <div>
        <Filter value={filter} onChange={handleFilterChange} />
        <Countries data={countriesToShow} setFilter={setFilter}/>
      </div>
  )
}

const Countries =({data,setFilter})=>{
  if (data.length>10){
    return (
      <div>
        Too many matches specify another filter
      </div>
    )
  }else if (data.length>1){
    return (
      <div>
        {data.map((country) => (
      <p key={country.cca3}>{country.name.common} <button onClick={()=> setFilter(country.name.common)}>show</button></p>
    ))}

      </div>
    )
  }else if(data.length===1){
    return (
        <Country country={data[0]}/>
        
    )    
  }
  }


const Filter = ({ value, onChange }) => (
  <div>
    find countries <input value={value} onChange={onChange} />
  </div>
)

const Country = ({country}) =>{
  const [countryData, setCountryData] = useState(null)
  const [weather,setWeather] = useState(null)
  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`)
      .then(res => res.json())
      .then(json => {
        setCountryData(json)                                 
      })
  }, [country])

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  useEffect(() => {
  const [lat, lon] = country.latlng

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then(res => res.json())
    .then(data => setWeather(data))
}, [country])
  if (!countryData || !weather) return <div>Loading...</div>

  return(
  <div>
    <h2>{countryData.name.common}</h2>
    <p>Capital {countryData.capital}</p>
    <p>Area {countryData.area}</p>
    <h2>Languagues</h2>
      <ul>
        {Object.values(countryData.languages).map((lang) => (
      <li key={lang}>{lang}</li>
    ))}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt}/>
      <h2>Weather in {countryData.capital}</h2>
      <p>Temperature is {weather.main.temp}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={countryData.flags.alt || 'flag'}/>
      <p>Wind {weather.wind.speed} m/s</p>
      
  </div>
  
    
  
    )
}


export default App;