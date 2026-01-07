import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm"
import WeatherMainInfo from "./weatherMainInfo"
import Loading from "./loading"

import styles from './weatherApp.module.css'

function WeatherApp() {
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)

    // useEffect Hook allow you to perform side effects in your component like fetching data, directly updating the DOM.

    useEffect(() => {
        loadInfo()
    }, []) // [] to execute just 1 time

    useEffect(() => {
        document.title = `Weather | ${weather?.name}`
    }, [weather]) // run on the first render and any timy any dependecy value changes

    async function loadInfo(city = 'london'){
        try {
            setError(null);
            const request = await fetch(`${process.env.REACT_APP_URL}${city}&units=metric&appid=${process.env.REACT_APP_KEY}`)
            const json = await request.json()
            if (json.cod == 200) setWeather(json)
            else {
                setError('City not found')
            }
        } catch(error){ setError(error.message)}
    }

    function handleChangeCity(city){
        //setWeather(null)
        loadInfo(city)
    }

    function clearError() {
        setError(null)
    }

    return (
        <div className={styles.back} style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?${weather?.name ?? 'landscape'})` }}>
            <div className={styles.card}>
                <WeatherForm onChangeCity={handleChangeCity} error={error} clearError={clearError} />
                {weather? <WeatherMainInfo weather={weather}/> : <Loading />}
            </div>
        </div>
    ) 
}


export default WeatherApp