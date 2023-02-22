import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm"
import WeatherMainInfo from "./weatherMainInfo"

import styles from './weatherApp.module.css'

function WeatherApp() {
    const [weather, setWeather] = useState(null)
   
    useEffect(() => {
        loadInfo()
    }, []) // [] to execute just 1 time

    useEffect(() => {
        document.title = `Weather | ${weather?.name}`
    }, [weather]) 

    async function loadInfo(city = 'london'){
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}${city}&units=metric&appid=${process.env.REACT_APP_KEY}`)
            const json = await request.json()
            setWeather(json)
        } catch(error){ console.log('ERROR')}
    }

    function handleChangeCity(city){
        setWeather(null)
        loadInfo(city)
    }

    return <div className={styles.card}>
        <WeatherForm onChangeCity={handleChangeCity} />
        <WeatherMainInfo weather={weather}/>
    </div>
}


export default WeatherApp